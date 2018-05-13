const getUrl = require('./get-url')();
const shortenUrl = require('./shorten-url')();

module.exports = {
  getUrl,
  shorten: shortenUrl,
};
