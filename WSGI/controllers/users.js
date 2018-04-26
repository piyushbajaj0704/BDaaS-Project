/**
 * Created by charl on 11/8/2017.
 */
const mongoose = require('mongoose'),
    User = mongoose.model('User');

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create = function (req, res) {
    if (req.body.email && req.body.password) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
                return res.json({"error": "error encrypting password"});
            }

            const userData = {
                email: req.body.email,
                encrypted_password: hash,
                fullName: req.body.fullName
            };
            //use schema.create to insert data into the db
            User.create(userData, function (err, user) {
                if (err) {
                    console.error(err);
                    return res.json({"error": "error adding user to the database"});
                } else {
                    return res.json({"success": true, "msg": "successfully added user to database"});
                }
            });

        })
    }
    else {
        return res.json({"error": "invalid user parameters"});
    }
};

exports.edit = function (req, res) {
    var request = req.body;

    if (!request.email) {
        return res.json({"error": "you must query a user by email"})
    }

    User.findOne({"email": request.email}, function (err, user) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        if (!user) {
            return res.json({"success": false, "message": "I can't find a user by that email address" + request.email})
        }

        user.fullName = request.fullName || user.fullName;

        user.save(function (err) {
            if (err) {
                return res.json(err)
            }
            return res.json(user);
        })
    })


};


exports.list = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
            return res.json(err);
        }

        return res.json(users)
    })


};