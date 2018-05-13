const mongo = require('../get-mongo-database');
const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc')

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },

  user: mongoose.Schema.Types.ObjectId,

  hash: {
    type: String,
    unique: true
  },
  isCustom: {
    type: Boolean,
    required: true
  },

  removeToken: {
    type: String,
    required: true
  },

  counter: {
    type: Number,
  },

  protocol: String,
  domain: String,
  path: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  removedAt: Date,

  active: {
    type: Boolean,
    required: true,
    default: true
  }
})

urlSchema.plugin(autoIncrement, { model: 'Url', field: 'counter'});

const urlModel = mongo.model('Url', urlSchema);


module.exports = urlModel;
