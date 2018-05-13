const uuidv4 = require('uuid/v4');

/**
 * Generate an unique hash-ish- for an URL.
 * TODO: Deprecated the use of UUIDs.
 * TODO: Implement a shortening algorithm
 * @param {string} id
 * @returns {string} hash
 */
function generateHash(url) {
  // return uuidv5(url, uuidv5.URL);
  return uuidv4();
}

module.exports = generateHash;
