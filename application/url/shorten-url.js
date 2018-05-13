const uuidv4 = require('uuid/v4');
const parseUrl = require('url').parse;
const validUrl = require('valid-url');
const { domain } = require('../../configs');
const SERVER = `${domain.protocol}://${domain.host}`;

const defaultUrlStore = require('../../store/urls');


/**
 * Validate URI
 * @param {any} url
 * @returns {boolean}
 */
const isValid = (url) => validUrl.isUri(url);

const defaultDependencies = {
  urlStore: defaultUrlStore
};

/**
 * Generate a random token that will allow URLs to be (logical) removed
 * @returns {string} uuid v4
 */
function generateRemoveToken() {
  return uuidv4();
}

module.exports = (dependencies = defaultDependencies) => {
  const { urlStore } = dependencies;

  const getURLComponents = url => {
    // Get URL components for metrics sake
    const urlComponents = parseUrl(url);
    const protocol = urlComponents.protocol || '';
    const domain = `${urlComponents.host || ''}${urlComponents.auth || ''}`;
    const path = `${urlComponents.path || ''}${urlComponents.hash || ''}`;
    return ({ protocol, domain, path });
  };

  const buildShortUrl = (url, removeToken, hash) => {
    const { protocol, domain, path } = getURLComponents(url);
    return ({
      url,
      protocol,
      domain,
      path,
      hash,
      isCustom: false,
      removeToken,
    });
  }

  /**
 * Create an instance of a shortened URL in the DB.
 * Parse the URL destructuring into base components (Protocol, Host, Path).
 * An Error will be thrown if the URL is not valid or saving fails.
 * @param {string} url
 * @param {string} hash
 * @returns {object}
 */
  async function shorten(url, hash) {
    if (!isValid(url)) {
      throw new Error('Invalid URL');
    }

    // Generate a token that will alow an URL to be removed (logical)
    const removeToken = generateRemoveToken();
    const shortUrl = buildShortUrl(url, removeToken, hash);

    await urlStore.save(shortUrl);
    // TODO: Handle save errors
    return {
      url,
      shorten: `${SERVER}/${hash}`,
      hash,
      removeUrl: `${SERVER}/${hash}/remove/${removeToken}`
    };
  }
  return shorten;
}
