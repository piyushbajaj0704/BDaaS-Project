/**
 * Created by charlesmackay on 11/9/17.
 */
var express = require('express');
var router = express.Router();
const farm_ctrl = require('../controllers/farm.js');
const jwt = require('../controllers/jwt.js');


/* GET home page. */
router.get('/api/farm/query', jwt.verify, farm_ctrl.listQuery);
router.post('/api/farm/add', farm_ctrl.addFarm);
router.get('/api/farm/list', farm_ctrl.listFarms);
router.get('/api/farm/info', farm_ctrl.getFarmInfo);
router.post('/api/farm/edit', farm_ctrl.editFarm);


module.exports = router;
