var express = require('express');
var router = express.Router();

/* Get user list */

router.get('/', function(req, res, next) {
  res.send('response with source');
});

module.exports = router;
