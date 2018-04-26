/**
 * Created by charl on 11/4/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var farmSchema = new Schema({
    farm_id: Number,
    name: String,
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    thresholds: {
        temperature : {
            // temperatures in Celsius
            high:
                {
                    type: Number,
                    default: 30.0,
                },
            low: {
                type: Number,
                default: 15.5
            },
        },
        moisture: {
            high:
                {
                    type: Number,
                    default: 500,
                },
            low: {
                type: Number,
                default: 325
            },
        }
    },
    location: String
});

mongoose.model('Farm', farmSchema);
