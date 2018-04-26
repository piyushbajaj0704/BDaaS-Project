/**
 * Created by charl on 11/4/2017.
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

mongoose.model('Plant', plantSchema);
