const joi = require('joi');

const mongoConnectionSchema = joi.object({
  MONGO_DB_HOST: joi.string().required(),
  MONGO_DB_PORT: joi.number().integer().positive().required(),
  MONGO_DB_NAME: joi.string().required(),
  MONGO_DB_USER: joi.string().required(),
  MONGO_DB_PASS: joi.string().required(),
  MONGO_DB_AUTH: joi.string().required(),
}).unknown().required();

const { error, value: envMongoConnectionConfig } = joi.validate(process.env, mongoConnectionSchema);
if (error) throw new Error(`Mongo Connection config error: ${error.message}`);

const mongoConnectionConfig = {
  HOST: envMongoConnectionConfig.MONGO_DB_HOST,
  PORT: envMongoConnectionConfig.MONGO_DB_PORT,
  NAME: envMongoConnectionConfig.MONGO_DB_NAME,
  USER: envMongoConnectionConfig.MONGO_DB_USER,
  PASS: envMongoConnectionConfig.MONGO_DB_PASS,
  AUTH: envMongoConnectionConfig.MONGO_DB_AUTH,
};

module.exports = mongoConnectionConfig;
