const joi = require('joi');
const throwValidationError = require('../../helpers/throw-validation-error');

const urlBodySchema = joi.object().keys({
  url: joi.string().required(),
})

const validateUrlBody = urlBody => {
  const { error, value } = joi.validate(urlBody, urlBodySchema);
  if (error !== null) throwValidationError(error);
  return value;
};

module.exports = {
  validateUrlBody,
}