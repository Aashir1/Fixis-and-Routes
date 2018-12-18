var LiveTrack = require('../Model/LiveTrackModel');
var throwError = require("../ErrorHandler/Error");

class LiveTrackClass {
    static addCurrLocation(info, res, next) {
        let liveTrack = new LiveTrack(info);
        liveTrack.save().then((value) => {
            res.json({ status: "success", info })
        }).catch(err => {
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
}
module.exports = LiveTrackClass;