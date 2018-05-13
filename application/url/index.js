const getUrl = require('./get-url')();
const shortenUrl = require('./shorten-url')();
const generateHash = require('./generate-hash');

module.exports = {
  getUrl,
  shorten: shortenUrl,
  generateHash,
};
