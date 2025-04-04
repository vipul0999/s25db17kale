var express = require('express');
var router = express.Router();

/* GET random item page. */
router.get('/random', function(req, res, next) {
  res.render('randomitem', { title: 'A Random Item' });
});

module.exports = router;
