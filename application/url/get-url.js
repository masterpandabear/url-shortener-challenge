const defaultUrlStore = require('../../store/urls');

const defaultDependencies = {
  urlStore: defaultUrlStore,
};

module.exports = (dependencies = defaultDependencies) => {
  const { urlStore } = dependencies;
  /**
 * Lookup for existant, active shortened URLs by hash.
 * 'null' will be returned when no matches were found.
 * @param {string} hash
 * @returns {object}
 */
  const getUrl = hash => urlStore.getByHash(hash);
  return getUrl;
};
