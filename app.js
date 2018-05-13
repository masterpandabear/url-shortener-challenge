const express = require('express');
const bodyParser = require('body-parser');

const url = require('./application/url/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', url);

const handleError = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  const messageToReturn = error.name === 'MongoError' ? 'Internal Error, try again later' : error.message;
  res.status(statusCode);
  res.json({
    message: messageToReturn,
    code: error.code || error.errorCode,
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

app.use(handleError);

module.exports = app;
