const functions = require('firebase-functions');
const express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const app = express();
app.get('/timestamp', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600'); //ここを追記しました
  response.send(`${Date.now()}`);
})

// API Sample

var users = require('./routes/users');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};

  res.status(err.status || 500);
  res.render('error');
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
exports.app = functions.https.onRequest(app);

// exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
