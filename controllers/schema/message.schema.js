const Joi = require('joi');

const messsageSchema = Joi.object({
    message: Joi.string()
        .min(1)
        .required()
});

module.exports = {
    messsageSchema
};
