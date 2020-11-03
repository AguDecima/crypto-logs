const logger = require('../utils/logger.utils');
const Joi = require('joi');

function schemaValidation(functionName, payload, schema) {
  try {
    Joi.assert(payload, schema);
    logger.debug(`[FUNCTION - ${functionName}]: the schema is valid`);
    return payload;
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

module.exports={schemaValidation};
