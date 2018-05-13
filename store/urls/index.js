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

const removeUrl = (hash, removeToken) => {
  const newValues = {
    active: 0,
    removedAt: new Date(),
    removedHash: hash,
  }
  return UrlModel.update({ hash, removeToken}, { $set: newValues, $unset: { hash: 1 }})
    .then(({ nModified }) => nModified > 0 );
}

module.exports = {
  getByHash,
  updateHash,
  removeUrl,
  save,
};
