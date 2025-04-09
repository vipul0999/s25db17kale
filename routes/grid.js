var express = require('express');
var router = express.Router();

/* GET grid page with query parameters */
router.get('/', function(req, res, next) {
  let query = req.query;

  // Log query parameters to the server console
  console.log(`rows: ${query.rows}`);
  console.log(`cols: ${query.cols}`);

  // Pass the query object into the pug engine
  res.render('grid', { title: "Grid Display", query: query });
});

module.exports = router;
