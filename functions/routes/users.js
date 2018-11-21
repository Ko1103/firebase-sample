const admin = require('firebase-admin');
const functions = require('firebase-functions');
var sys = require('util');
var express = require('express');
var router = express.Router();

// setup firestore
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

/* Get user list */
router.get('/', function(req, res, next) {
  var cityRef = db.collection('cities').doc(req.body.name);
  var getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          res.json(doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
});

router.post('/', function(req, res, next) {
  var newData = req.body
  // var data = {
  //   name: 'Los Angeles',
  //   state: 'CA',
  //   country: 'USA',
  //   capital: true
  // };
  var docRef = db.collection('cities').doc(newData.name);
  var setLA = docRef.set(newData).then(ref => {
    console.log('Added document with ID: ', ref.id);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
})
module.exports = router;
