var express = require('express');
var router = express.Router();

var bots = require('../controllers/bots.js');
var jwt = require('../controllers/jwt.js');

const path = require('path');


router.post('/api/authenticate', jwt.authenticate);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// render a swig template to give it dynamic html instead of static html.
router.get('/dev', function(req, res) {
    // res.sendFile(__dirname + '/frontend.html');
    res.sendFile(path.join(__dirname + '/../public/frontend.html'));

});

router.post('/api/update', bots.update);

router.post('/api/testtoken', jwt.verify, function (req, res) {
    res.send('success!')
});

router.get('/api/testtoken', jwt.verify, function (req, res) {
    res.send('success!')
});

var pg_ctrl = require('../controllers/pg_test');
/* GET users listing. */

router.get('/test_pg', pg_ctrl.testQuery);

module.exports = router;
