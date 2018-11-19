var LiveTrack = require('../Model/LiveTrackModel');
var throwError = require("../ErrorHandler/Error");

class LiveTrackClass {
    static addCurrLocation(info) {
        let liveTrack = new LiveTrack(info);
        liveTrack.save().then((value) => {
            console.log(value);
        }).catch(err => {
            console.log(err);
        })
    }
    static getCurrLocation(req, res, next) {
        let { bus_name, date } = req.query;
        if (!bus_name || !date) {
            throwError("missing query parameters", 422, next);
        } else {
            console.log(bus_name,date);
            // LiveTrack.find({bus_name:bus_name}, (err, data) => {
            //     if (err) {
            //         throwError(err.message, 500, next);
            //     } else {
            //         console.log(data);
            //         res.json({ status: "success", data })
            //     }
            // })
            LiveTrack.find({bus_name,date:{"$gte":new Date(date)}}).then(value=>{
                res.json({ status: "success", value })
            }).catch(err=>{
                throwError(err.message,500,next)
            })
        }
    }
}
module.exports = LiveTrackClass;