/**
 * Created by charlesmackay on 11/9/17.
 */

// Module dependencies
const mongoose = require('mongoose'),
    Plant = mongoose.model('Plant'),
    Farm = mongoose.model('Farm'),
    User = mongoose.model('User');

/*
 const plantSchema = new Schema({
 plant:  String,
 moisture: Number,
 light:   Number,
 temperature: Number,
 date: { type: Date, default: Date.now },
 system_time: Date,
 farm_id: Number,
 sensor_id: Number
 });
 */

function build_search_query(request) {

    var search_query = {};

    if (request.plant) {
        search_query['plant'] = request.plant;
    }
    if (request.sensor_id) {
        search_query['sensor_id'] = request.sensor_id;
    }
    if (request.farm_id) {
        search_query['farm_id'] = request.farm_id;
    }
    if (request.start_date || request.end_date) {
        var date_range = {};
        if (request.start_date) {
            date_range['$gte'] = request.start_date;
        }
        if (request.end_date) {
            date_range['$lte'] = request.end_date;
        }
        search_query['system_time'] = date_range;
    }

    return search_query;
}

exports.listQuery = function (req, res) {
    var request = req.query;
    var search_query = build_search_query(request);


    Plant.find(search_query, function (err, data) {

        if (err) {
            console.error(err.toString());
            return res.json(err);
        }

        return res.json(data);
    })
};

exports.listFarms = function (req, res) {

    Farm.find({}, function (err, farms) {
        if (err)
            return res.json(err);
        return res.json(farms)
    }).populate('owner');
};

exports.addFarm = function (req, res) {
    var request = req.body;

    User.findOne({'email': request.owner}, function (err, user) {
        if (err)
            throw err;
        if (!user) {
            return res.send("cant find that user");
        }

        request.owner = user._id;
        var farm = new Farm(request);

        farm.save(function (err) {
            if (err)
                return res.json(err);
            else {
                res.send("new farm saved!")
            }
        })
    })
};

exports.getFarmInfo = function (req, res) {
    var request = req.query;

    Farm.findOne({"name": request.name}, function (err, farm) {
        if (err)
            return res.json(err);
        return res.json(farm)
    }).populate('owner');
};

exports.editFarm = function (req, res) {
    var request = req.body;

    Farm.findOne({"farm_id": request.farm_id}, function (err, farm) {
        if (err)
            return res.json(err);

        farm.farm_id = request.farm_id || farm.farm_id;
        farm.thresholds.temperature.high = request.temp_hi || farm.thresholds.temperature.high;
        farm.thresholds.temperature.low = request.temp_lo || farm.thresholds.temperature.low;
        farm.thresholds.moisture.high = request.moist_hi || farm.thresholds.moisture.high;
        farm.thresholds.moisture.low = request.moist_lo || farm.thresholds.moisture.low;
        farm.location = request.location || farm.location;

        farm.save(function (err) {
            if (err)
                return res.json(err);
            else {
                res.json({"success":true, "message":"new values saved!", "farm":farm})
            }
        });

    })


};