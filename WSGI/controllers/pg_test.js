/**
 * Created by charl on 11/4/2017.
 */
const pool = require('./db');

exports.testQuery = function(req, res)
{

    //to run a query we just pass it to the pool
//after we're done nothing has to be taken care of
//we don't have to return any client to the pool or close a connection
    pool.query('SELECT $1::int AS number', ['2'], function(err, resp) {
        if(err) {
            return console.error('error running query', err);
        }

        // console.log('number:', resp.rows[0].number);
        res.json({'number': resp.rows[0].number});
    });
    // res.send("ok")
};
