var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const c = req.cookie('userName') ? JSON.parse(res.cookie('userName')) ? {};
  res.render('index', { 
    title: 'Express',
    name: req.query.userName
  });
  res.cookie('userName',JSON.stringify({userName:req.query.UserName}))

});

module.exports = router;
