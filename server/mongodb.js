const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { mongo } = require('../configs');

const uri = `mongodb://${mongo.HOST}:${mongo.PORT}/${mongo.NAME}`;

/**
 , {
  auth: { authSource: Mongo.AUTH },
  user: Mongo.USER,
  pass: Mongo.PASS
}
 */
const database = mongoose.createConnection(uri);

module.exports = database;
