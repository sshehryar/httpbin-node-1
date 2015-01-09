var express = require('express');
var router  = express.Router();

/* GET user-agent */
router.get('/', function(req, res) {
  res.json({
  	'user-agent': req.header('user-agent')
  });
});

module.exports = router;
