const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-mongodb');
const logger = new (winston.Logger)();
const dbLogger = new (winston.Logger)();
const { mongo } = require('../configs');

const mongoUri = `mongodb://${mongo.HOST}:${mongo.PORT}/${mongo.NAME}`;

const consoleInfoOptions = {
  timestamp: () => new Date().toLocaleString(),
  level: 'info',
  name: 'info-console',
  colorize: true,
  json: false,
};

const mongoOptions = {
  db: mongoUri,
  level: 'error',
  handleExceptions: true,
}

const addInfoConsole = () => {
  logger.add(winston.transports.Console, consoleInfoOptions);
};

const addMongoTransport = () => {
  dbLogger.add(winston.transports.MongoDB, mongoOptions);
};

const confgureWinstonTransports = () => {
  addInfoConsole();
  addMongoTransport();
};

const loggerExpressWinston = {
  transports: [ new winston.transports.Console({
    json: false,
    colorize: true,
  })],
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms ",
  meta: false,
  colorize: true,
};


confgureWinstonTransports();
module.exports = {
  expressLogger: expressWinston.logger(loggerExpressWinston),
  logger,
  dbLogger,
};
