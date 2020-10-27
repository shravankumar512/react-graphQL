const { UserInputError } = require("apollo-server");
const Joi = require("joi");

const JoiSchemaObject = {
    login: {
        username: Joi.string().required(),
        password: Joi.string().required()
    },
    register: {
        username: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
        email: Joi.string().email().required()
    }
}

module.exports.validateSchema = async (schema, data) => {
    try {
        await Joi.object(JoiSchemaObject[schema]).validateAsync(data, { abortEarly: false })
    } catch (error) {
        // looping through multiple joi validation errors
        errorObj = {}
        error.details.map(o => { errorObj[o.context.key] = o.message })
        throw new UserInputError('Validation Errors', {
            errors: errorObj
        })
    }
}