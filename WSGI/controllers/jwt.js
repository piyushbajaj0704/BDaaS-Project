const jwt = require('jsonwebtoken');
const config = require('../env/config/jwt');
const mongoose = require('mongoose'),
    User = mongoose.model('User');

//
// exports.grant = function (req, res) {
//
//     var d = new Date();
//     var payload = {
//         "iss": "charles",
//         "name": "username goes here"
//     };
//     const token = encodeToken(payload);
//     res.json({"success": true, "msg": "Token granted", "token": token})
// };

function encodeToken(payload) {
    return jwt.sign(payload, config.secret, config.expiration);
}

exports.verify = function (req, res, next) {
    // get token from body, url, or header
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    // check if token was provided
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log(err);
                return res.json({success: false, message: 'Failed to authenticate token. ' +err.message });
            }
            else {

                req.decoded = decoded;
                console.log('token valid, and decoded: ' + JSON.stringify(decoded));
                next();
            }
        })
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

exports.authenticate = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({message: 'Authentication failed. User not found.'});
        } else if (user) {
            if (!user.checkPassword(req.body.password)) {
                res.status(401).json({message: 'Authentication failed. Wrong password.'});
            } else {

                const payload = {
                    "iss": "charles",
                    "name": user.fullName,
                    "email": user.email,
                    "fullName": user.fullName,
                    _id: user._id
                };
                const token = encodeToken(payload);
                res.json({"success": true, "msg": "Token granted", "token": token})

            }
        }
    });
};