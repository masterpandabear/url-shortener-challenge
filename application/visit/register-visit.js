const defaultVisitStore = require('../../store/visit');

const defaultDependencies = {
  visitStore: defaultVisitStore,
};

module.exports = (dependencies = defaultDependencies) => {
  const { visitStore } = dependencies;
  const registerVisit = (agent, urlId) => visitStore.save(agent, urlId);

  return registerVisit;
};
