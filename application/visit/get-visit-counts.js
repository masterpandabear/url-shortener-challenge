const defaultVisitStore = require('../../store/visit');

const defaultDependencies = {
  visitStore: defaultVisitStore,
};

module.exports = (dependencies = defaultDependencies) => {
  const { visitStore } = dependencies;
  const getVisitCounts = urlId => visitStore.getVisitCounts(urlId);
  return getVisitCounts;
};
