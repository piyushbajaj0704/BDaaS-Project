
// Module dependencies
const mongoose = require('mongoose'),
    Plant = mongoose.model('Plant'),
    Farm = mongoose.model('Farm');

const slacker = require('../utils/slacker.js');

var slack_msg = "";

exports.update = function (req, res) {
    var request = req.body;
    console.log('iot device sending data to server');
    var temp = request.temperature/10; // convert sensor data;
    if (request.farm_id) // if farm_id is specified, look up thresholds and send alerts.
    {
        Farm.findOne({"farm_id": request.farm_id}, function (err, farm) {
            if (err || !farm)
            {
                console.log("couldnt find farm")
            }
            else
            {
                if (temp > farm.thresholds.temperature.high)
                {
                    slack_msg = "Alert! Sensor ID " + request.sensor_id + " exceeded a high temperature threshold of " + farm.thresholds.temperature.high
                        +  " with a value of " + temp + " at farm " + farm.farm_id + " location " + farm.location;
                    slacker.sendSlackMessage(slack_msg)
                }
                if (temp < farm.thresholds.temperature.low)
                {
                    slack_msg = "Alert! Sensor ID " + request.sensor_id + " exceeded a low temperature threshold of " + farm.thresholds.temperature.low
                        +  " with a value of " + temp + " at farm " + farm.farm_id + " location " + farm.location;
                    slacker.sendSlackMessage(slack_msg)
                }
                if (request.moisture > farm.thresholds.moisture.high)
                {
                    slack_msg = "Alert! Sensor ID " + request.sensor_id + " exceeded a high moisture threshold of " + farm.thresholds.moisture.high
                        +  " with a value of " + request.moisture + " at farm " + farm.farm_id + " location " + farm.location;
                    slacker.sendSlackMessage(slack_msg)
                }
                if (request.moisture < farm.thresholds.moisture.low)
                {
                    slack_msg = "Alert! Sensor ID " + request.sensor_id + " exceeded a low moisture threshold of " + farm.thresholds.moisture.low
                        +  " with a value of " + request.moisture + " at farm " + farm.farm_id + " location " + farm.location;
                    slacker.sendSlackMessage(slack_msg)
                }
            }


            var plant_update = new Plant(req.body);
            plant_update.save((err)=>{
                if (err){
                    console.log("error saving status update");
                    return res.json(err)
                }
                else
                {
                    var d = new Date;
                    d = d.toISOString();
                    return res.json({"success": true, "msg": "received update", "date_received": d})
                }
            });
        })
    }
    else {
        var plant_update = new Plant(req.body);
        plant_update.save((err)=>{
            if (err){
                console.log("error saving status update");
                return res.json(err)
            }
            else
            {
                var d = new Date;
                d = d.toISOString();
                return res.json({"success": true, "msg": "received update", "date_received": d})
            }
        });
    }

};