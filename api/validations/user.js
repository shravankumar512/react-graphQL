const Joi = require("joi");

const JoiSchemaObject = {
    registerUser: {
        username: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
        email: Joi.string().email().required()
    }
}

module.exports.validateSchema = (schema, data) => {
    return Joi.object(JoiSchemaObject[schema]).validateAsync(data, { abortEarly: false })
}