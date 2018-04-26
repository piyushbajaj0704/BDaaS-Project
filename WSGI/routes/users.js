const express = require('express');
const router = express.Router();
const jwt = require('../controllers/jwt.js');
const Users = require('../controllers/users.js');

router.post('/create',jwt.verify, Users.create);
router.post('/edit', jwt.verify, Users.edit);
router.get('/list',  Users.list);

module.exports = router;
