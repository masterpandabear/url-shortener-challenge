const CustomError = require('./custom-error');

module.exports = (message = '', statusCode = 400, name = 'Error', errorCode = 1) => {
  throw new CustomError(name, message, statusCode, errorCode);
};
