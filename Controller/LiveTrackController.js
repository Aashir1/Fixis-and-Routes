var LiveTrack = require('../Model/LiveTrackModel');
var throwError = require("../ErrorHandler/Error");
var AuthModel = require("../Model/AuthModel");
var request = require("request");


class LiveTrackClass {
    static addCurrLocation(info, res, next) {
        let liveTrackObj = new LiveTrack(info);
        liveTrackObj.save()
            .then(doc => {
                res.json({ status: 'success', data: doc })
            })
            .catch(error => {
                throwError(err.message, 500, next)
            })
    }
    static getCurrLocation(req, res, next) {
        let { bus_name, date, daylight } = req.query;
        if (!bus_name || !date || !daylight) {
            throwError("missing query parameters", 422, next);
        } else {
            console.log(bus_name, date);
            console.log(typeof date);
            // LiveTrack.find({bus_name:bus_name}, (err, data) => {
            //     if (err) {
            //         throwError(err.message, 500, next);
            //     } else {
            //         console.log(data);
            //         res.json({ status: "success", data })
            //     }
            // })
            let dateArray = date.split(",");
            console.log(dateArray)
            if (daylight == "morning")

                LiveTrack.find({ bus_name, date: { "$gte": new Date(dateArray[0], dateArray[1], dateArray[2], 1, 0), "$lte": new Date(dateArray[0], dateArray[1], dateArray[2], 7, 0) } }).then(value => {
                    res.json({ status: "success", value })
                }).catch(err => {
                    throwError(err.message, 500, next)
                })
            else if (daylight == "evening") {
                LiveTrack.find({ bus_name, date: { "$gte": new Date(dateArray[0], dateArray[1], dateArray[2], 11, 0), "$lte": new Date(dateArray[0], dateArray[1], dateArray[2], 14, 0) } }).then(value => {
                    res.json({ status: "success", value })
                }).catch(err => {
                    throwError(err.message, 500, next)
                })
            }
        }
    }

    static sendNotification(info) {
        try {
            // let json = JSON.parse(`{${message}}`);
            // console.log("json", json);
            if (info.lng > 0 && info.lat > 0 && info.date && info.time) {
                const distance1 = distance(25.083326, 67.012554, info.lat, info.lng);//for hu alert
                const distance2 = distance(25.074447, 67.013600, info.lat, info.lng);//for nothrenbypass alert
                if (distance1 <= 0.02880746058673089 || distance2 <= 0.02880746058673089) {
                    console.log('send web notification');
                }
                console.log("inside if of message")
                io.emit(info.bus_name, info);
                // LiveTrackController.addCurrLocation(message);
                AuthModel.find({}, (err, res) => {
                    if (!err) {
                        users = [...res];
                        // console.log(res.length);
                        // for (let i = 0; i < res.length; i++) {
                        //     console.log("users:", users[i].userInfo)
                        // }
                        for (let i = 0; i < res.length; i++) {
                            console.log(users[i], "distance: ", distance(info.lat, info.lng, res[i].userInfo.stopLocation.lat, res[i].userInfo.stopLocation.lng))
                            if (distance(info.lat, info.lng, res[i].userInfo.stopLocation.lat, res[i].userInfo.stopLocation.lng) <= radius) {
                                request.post(`https://routes-fyp.firebaseio.com/notification/${res[i]._id}.json`, { json: true, body: { title: "Get Ready!", message: "Bus is arriving" } })
                            }
                        }
                    }
                });
            }
        } catch (e) {
            console.log(e.message)
        }
    }
}

function distance(lat1, lon1, lat2, lon2, unit = 'K') {
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
module.exports = LiveTrackClass;