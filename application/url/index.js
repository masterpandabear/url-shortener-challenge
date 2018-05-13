const getUrl = require('./get-url')();
const shortenUrl = require('./shorten-url')();
const removeUrl = require('./remove-url')();

module.exports = {
  getUrl,
  removeUrl,
  shorten: shortenUrl,
};
