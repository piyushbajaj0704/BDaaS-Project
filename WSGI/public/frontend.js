/**
 * Created by charl on 12/11/2017.
 */

function getVpnList() {
    $.get("/api/vpn/list")
        .done(function (data) {
            // console.log(response)
            var response = data.routing_table;
            $.each(response, function (i, item) {
                $('<tr>').html("<td>" + response[i].virtual_address  + "</td><td>" + response[i].common_name + "</td><td>" + response[i].real_address + "</td>").appendTo('#vpnDiv');
            });
        });
}


function getFarmList() {
    $.get("/api/farm/list")
        .done(function (response) {
            // console.log(response)
            $.each(response, function (i, item) {
                $('<tr>').html("<td>" + response[i].name  + "</td><td>" + response[i].farm_id + "</td><td>" + response[i].location + "</td>").appendTo('#farmTable');
            });
        });
}


function getUsersList() {
    $.get("/users/list")
        .done(function (response) {
            console.log(response)
            $.each(response, function (i, item) {
                $('<tr>').html("<td>" + response[i].fullName  + "</td><td>" + response[i].email + "</td><td>" + response[i].created + "</td>").appendTo('#usersTable');
            });
        });
}