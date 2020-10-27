const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const { validateSchema } = require('../../validations/user');

module.exports = {
    Mutation: {
        async register(_, { registerUser: { username, email, password, confirmPassword } }) {

            try {

                // joi validatation
                const validations = await validateSchema('registerUser', { username, email, password, confirmPassword })
                console.log('validations --- \n', validations)

            } catch (error) {
                // looping through multiple joi validation errors
                errorObj = {}
                error.details.map(o => { errorObj[o.context.key] = o.message })
                throw new UserInputError('Register User Validation Errors', {
                    errors: errorObj
                })
            }

            // check whether the username already exist in db
            const existingUser = await User.findOne({ username })
            if (existingUser) {
                throw new UserInputError('Username is taken', {
                    errors: { username: 'This username is taken' }
                })
            }

            // inserting new User into mongodb
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h' })

            return {
                ...res._doc,
                id: res._id,
                token
            }

        }
    }
}