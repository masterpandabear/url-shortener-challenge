const UrlModel = require('./schema');

const getByHash = () => UrlModel.findOne({ active: true, getByHash });

const urlPublicSchema = {
  url: '',
  protocol: '',
  domain: '',
  path: '',
  hash: '',
  isCustom: false,
  removeToken: '',
}

const save = (urlToSave = urlPublicSchema) => {
  const url = new UrlModel(Object.assign({}, urlToSave, { active: 1 }));
  return url.save();
}

module.exports = {
  getByHash,
  save,
};