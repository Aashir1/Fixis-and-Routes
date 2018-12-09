var LiveTrackController = require("../Controller/LiveTrackController");
var AuthModel = require("../Model/AuthModel");
var request = require("request");
var users = [];
var radius = 0.35;
module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A client just joined on', socket.id);
        // socket.on("message", (message) => {
        //     console.log(message);
        //     socket.emit("messages", message)
        // })
        socket.on("message", (message) => {
            // let json = JSON.parse(`{${message}}`);
            //     console.log("json", json);
            console.log("message", message)
            try {
                // let json = JSON.parse(`{${message}}`);
                // console.log("json", json);
                // LiveTrackController.addCurrLocation(json);
                if (message.lng > 0 && message.lat > 0 && message.date && message.time) {
                    console.log("inside if of message")
                    // io.emit(message.bus_name, message);
                    AuthModel.find({}, (err, res) => {
                        if (!err) {
                            users = [...res];
                            // console.log(res.length);
                            // for (let i = 0; i < res.length; i++) {
                            //     console.log("users:", users[i].userInfo)
                            // }
                            for (let i = 0; i < res.length; i++) {
                                console.log(users[i], "distance: ", distance(message.lat, message.lng, res[i].userInfo.stopLocation.lat, res[i].userInfo.stopLocation.lng))
                                if (distance(message.lat, message.lng, res[i].userInfo.stopLocation.lat, res[i].userInfo.stopLocation.lng) <= radius) {
                                    request.post(`https://routes-fyp.firebaseio.com/notification/${res[i]._id}.json`, { json: true, body: { title: "Get Ready!", message: "Bus is arriving" } }, )
                                }
                            }
                        }
                    });
                }

            } catch (e) {
                console.log(e.message)
            }
        });

        socket.on('disconnect', function () {
            console.log("disconnected", socket.id)
        });
    });
}
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}
