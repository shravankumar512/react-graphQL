const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const { validateSchema } = require('../../validations/user');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            // joi validatation
            await validateSchema('login', { username, password });

            const user = await User.findOne({ username });
            if (!user) {
                errors = { general: 'User not found' };
                throw new UserInputError('User not found', { errors });
            }

            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                errors = { general: 'Wrong Crendetials' };
                throw new UserInputError('Wrong Crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(_, { registerInput: { username, email, password, confirmPassword } }) {

            // joi validatation
            await validateSchema('register', { username, email, password, confirmPassword });

            // check whether the username already exist in db
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new UserInputError('Username is taken', {
                    errors: { username: 'This username is taken' }
                });
            }

            // inserting new User into mongodb
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };

        }
    }
};