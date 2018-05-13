const mongo = require('../get-mongo-database');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new mongoose.Schema({
  url: {
    type: Schema.Types.ObjectId,
    ref: 'Url',
  },

  agent: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const visitModel = mongo.model('Visit', visitSchema);

module.exports = visitModel;
