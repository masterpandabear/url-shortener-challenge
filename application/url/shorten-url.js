const uuidv4 = require('uuid/v4');
const parseUrl = require('url').parse;
const validUrl = require('valid-url');
const { domain } = require('../../configs');
const SERVER = `${domain.protocol}://${domain.host}`;
const throwError = require('../../helpers/throw-error');

const defaultUrlStore = require('../../store/urls');
const defaultCypher = require('../cypher')();

/**
 * Validate URI
 * @param {any} url
 * @returns {boolean}
 */
const isValid = (url) => validUrl.isUri(url);

const defaultDependencies = {
  urlStore: defaultUrlStore,
  cypher: defaultCypher,
};

/**
 * Generate a random token that will allow URLs to be (logical) removed
 * @returns {string} uuid v4
 */
function generateRemoveToken() {
  return uuidv4();
}

module.exports = (dependencies = defaultDependencies) => {
  const { urlStore, cypher } = dependencies;

  const getURLComponents = url => {
    // Get URL components for metrics sake
    const urlComponents = parseUrl(url);
    const protocol = urlComponents.protocol || '';
    const domain = `${urlComponents.host || ''}${urlComponents.auth || ''}`;
    const path = `${urlComponents.path || ''}${urlComponents.hash || ''}`;
    return ({ protocol, domain, path });
  };

  const buildShortUrl = (url, removeToken) => {
    const { protocol, domain, path } = getURLComponents(url);
    return ({
      url,
      protocol,
      domain,
      path,
      hash: '-',
      isCustom: false,
      removeToken,
    });
  }

  const validateCustomHash = async (customHash) => {
    const duplicateHashUrl = await urlStore.getByHash(customHash);
    if (duplicateHashUrl) throwError('Custom hash is already in use', 400, 'ValidationError', 400);
    return customHash;
  }

  const registerCustomUrl = async (hash, shortUrl) => {
    await validateCustomHash(hash);
    shortUrl.isCustom = true;
    shortUrl.hash = hash;
    await urlStore.save(shortUrl);
    return hash;
  }

  const registerUrl = async (shortUrl) => {
    const saved = await urlStore.save(shortUrl);
    const hash = cypher.encode(saved.counter);
    await urlStore.updateHash(saved._id, hash);
    return hash;
  }

  const shouldRegisterCustomHash = (customHash = '') => customHash !== '';

  /**
 * Create an instance of a shortened URL in the DB.
 * Parse the URL destructuring into base components (Protocol, Host, Path).
 * An Error will be thrown if the URL is not valid or saving fails.
 * @param {string} url
 * @param {string} hash
 * @returns {object}
 */
 const shorten = async({url, customHash }) => {
    if (!isValid(url)) {
      throwError('url provided is not valid', 400, 'ValidationError', 400);
    }

    const removeToken = generateRemoveToken();
    const shortUrl = buildShortUrl(url, removeToken);
    let hash;
    if (shouldRegisterCustomHash(customHash)) {
      hash = await registerCustomUrl(customHash, shortUrl);
    } else {
      hash = await registerUrl(shortUrl)
    }

    return {
      url,
      shorten: `${SERVER}/${hash}`,
      hash,
      removeUrl: `${SERVER}/${hash}/tokens/${removeToken}`
    };
  }
  return shorten;
}
