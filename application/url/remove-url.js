const defaultUrlStore = require('../../store/urls');
const throwError = require('../../helpers/throw-error');

const defaultDependencies = {
  urlStore: defaultUrlStore,
};

module.exports = (dependencies = defaultDependencies) => {
  const { urlStore } = dependencies;


  const checkRemoval = wasRemoved => {
    if (wasRemoved) return wasRemoved;
    throwError('Url does not exist or removeToken is not valid', 404, 'URLRemoveError', 404);
  }
  /**
   * Removes (soft delete) an already registered url
   * @param {string} hash
   * @returns {object}
 */
  const removeUrl = async (hash, removeToken) => (
    urlStore.removeUrl(hash, removeToken)
      .then(checkRemoval)
  );

  return removeUrl;
};
