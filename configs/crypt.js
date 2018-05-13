const joi = require('joi');

const domainSchema = joi.object({
	SALT_ROUNDS: joi.number().integer().positive().required(),
}).unknown().required();

const { error, value: envDomainConfig } = joi.validate(process.env, domainSchema);
if (error) throw new Error(`Domain config error: ${error.message}`);

const domainConfig = {
	saltRounds: envDomainConfig.SALT_ROUNDS,
};

module.exports = domainConfig;
