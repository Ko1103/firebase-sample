const admin = require('firebase-admin');
const functions = require('firebase-functions');
var sys = require('util');
var express = require('express');
var router = express.Router();
// var promise = new Promise((resolve, reject) => {

// setup firestore
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

/* Get user list */
router.get('/', function(req, res, next) {
  db.collection('users').get()
    .then((snapshot) => {
      var users = new Array();
      snapshot.forEach((doc) => {
        users.push(doc.data());
      });
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', function(req, res, next) {
  var newData = req.body
  var docRef = db.collection('users').doc(newData.name);
  docRef.set(newData).then(ref => {
    console.log('success');
    res.send('success');
  }).catch(function (error) {
    console.log(error);
    next(error);
  });
})
module.exports = router;
