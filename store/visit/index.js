const VisitModel = require('./schema');

const visitPublicSchema = {
  agent: '',
}

const save = (visitToSave = visitPublicSchema, urlId) => {
  const visit = new VisitModel(Object.assign({}, visitToSave, { url: urlId }));
  return visit.save();
};

const getVisitCounts = urlId => VisitModel.count({ url: urlId });


module.exports = {
  save,
  getVisitCounts,
}
