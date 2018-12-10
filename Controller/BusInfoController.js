var BusInfo = require('../Model/BusInfoModel');
var throwError = require("../ErrorHandler/Error");
class BusInfoClass {
    static getInfo(page, res, next) {
        var perPage = 10
        var page = page || 1;
        BusInfo.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, infos) {
                BusInfo.count().exec(function (err, count) {
                    if (err) {

                        throwError(err.message, 404, next);
                    }
                    if (page == Math.ceil(count / perPage)) {
                        res.json({
                            status: "success",
                            info: infos,
                            currentPage: page,
                            hasMorePages: false,
                            pages: Math.ceil(count / perPage)
                        })
                    } else {
                        res.json({
                            status: "success",
                            info: infos,
                            currentPage: page,
                            hasMorePages: true,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                })
            })
    }

    static addInfo(req, res, next) {
        let { busName, stopInfo, driverName, driverNum } = req.body;
        if (!busName || !stopInfo || !driverName || !driverNum) {
            return throwError("invalid request", 422, next);
        } else {
            let busInfoDoc = new BusInfo({
                bus_name: busName,
                bus_driver_name: driverName,
                bus_driver_phone: driverNum,
                stop_info: stopInfo
            });

            busInfoDoc.save((error, doc) => {
                if (!error) {
                    return res.json({ status: 'success', data: doc });
                }
                return throwError(error.message, 500, next);
            })
        }
    }

    static deleteInfo(req, res, next) {
        let { id } = req.params;
        if (!id) {
            return throwError("invalid request", 422, next);
        } else {
            BusInfo.findOneAndDelete({ _id: id }, (error, doc) => {
                if (!error && doc) {
                    return res.json({ status: 'success', data: doc });
                }
                return throwError(error.message, 500, next);
            })
        }
    }
    static updateInfo(req, res, next) {
        let { busName, stopInfo, driverName, driverNum, id } = req.body;
        if (!busName || !stopInfo || !driverName || !driverNum || !id) {
            return throwError("invalid request", 422, next);
        } else {
            let busInfo = {
                bus_name: busName,
                bus_driver_name: driverName,
                bus_driver_phone: driverNum,
                stop_info: stopInfo
            };
            BusInfo.findOneAndUpdate({ _id: id }, busInfo, { new: true }, (error, doc) => {
                if (!error && doc) {
                    return res.json({ status: 'success', data: doc });
                }
                return throwError(error.message, 500, next);
            });
        }
    }
}

module.exports = BusInfoClass;