// add logs
const Joi = require('joi');

function schemaValidation(functionName, payload, schema) {
  try {
    Joi.assert(payload, schema);
    return payload;
  } catch (err) {
    throw err;
  }
}

module.exports={schemaValidation};
