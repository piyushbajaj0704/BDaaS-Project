var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

var Vpn = require('../controllers/vpn');

router.get('/api/vpn/list', Vpn.parseOvpnLog);

module.exports = router;
