/**
 * Created by charl on 12/11/2017.
 */

/**
 * Created by charlesmackay on 5/23/17.
 */

fs = require('fs');
const vpnStatusLogPath = '/etc/openvpn/openvpn-status.log';

exports.parseOvpnLog =  function(req, res) {
    var tmp, idx, client;
    var section = "client_list";
    var section_counter = 0;
    var ret = {
        last_updated: null,
        client_list: [],
        routing_table: [],
        global_stats: []
    };
    try {
        var lines = fs.readFileSync(vpnStatusLogPath, 'utf8').split('\n');
    } catch (e) {
        return res.json(e);
        // throw " "+e;
    };

    //
    for (var i=0, l=lines.length; i<l; i++){
        section_counter++;
        //
        switch ( lines[i] ){
            case "ROUTING TABLE":
                section = "routing_table";
                section_counter = 0;
                idx.length = 0;
                break;
            case "GLOBAL STATS":
                section = "global_stats";
                section_counter = 0;
                idx.length = 0;
                break;
        };
        //
        // section: CLIENT LIST
        //
        if (section === "client_list" && section_counter === 3){
            idx = lines[i].toLowerCase().replace(/ /g,"_").split(",");
        } else if (section === "client_list" && section_counter >3 && idx.length>0){
            tmp = lines[i].split(",");
            client = {};
            for (var c=0, cl=idx.length; c<cl; c++){
                client[ idx[c] ] = tmp[c];
            };
            ret.client_list.push( client );
        };
        //
        // section: ROUTING TABLE
        //
        if (section === "routing_table" && section_counter === 1){
            idx = lines[i].toLowerCase().replace(/ /g,"_").split(",");
        } else if (section === "routing_table" && section_counter >1 && idx.length>0){
            tmp = lines[i].split(",");
            client = {};
            for (var c=0, cl=idx.length; c<cl; c++){
                client[ idx[c] ] = tmp[c];
            };
            ret.routing_table.push( client );
        };
        //
        lss = lines[i].split(",");

        if ( lss[0].toLowerCase() === "updated"){
            ret.last_updated = lss[1];
        };

        //
    };
    //
    res.json(ret);
};