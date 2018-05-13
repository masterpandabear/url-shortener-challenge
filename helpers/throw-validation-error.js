const throwError = require('./throw-error');

module.exports = error => {
  const message = error.details[0].message.replace(/"/g, '');
  throwError(message, 400, 'ValidationError', 400);
};
