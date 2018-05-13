const joi = require('joi');

const domainSchema = joi.object({
	DOMAIN_HOST: joi.string().required(),
	DOMAIN_PROTOCOL: joi.string().required(),
}).unknown().required();

const { error, value: envDomainConfig } = joi.validate(process.env, domainSchema);
if (error) throw new Error(`Domain config error: ${error.message}`);

const domainConfig = {
	host: envDomainConfig.DOMAIN_HOST,
	protocol: envDomainConfig.DOMAIN_PROTOCOL,
};

module.exports = domainConfig;
