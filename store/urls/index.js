const UrlModel = require('./schema');

const getByHash = (hash) => UrlModel.findOne({ active: true, hash }).populate('visits');

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

const updateHash = (id, hash) => UrlModel.findByIdAndUpdate(id, { hash });

module.exports = {
  getByHash,
  updateHash,
  save,
};
