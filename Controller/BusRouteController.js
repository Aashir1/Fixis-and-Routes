var BusRoute = require('../Model/BusRouteModel');
var throwError = require("../ErrorHandler/Error");


class BusRouteClass {
    static getRoute(name, res, next) {
        console.log("id", typeof name)
        if (name) {
            BusRoute.find({ "bus_name": name }).then(value => {
                console.log('value: ', value);
                if (value[0])
                    res.json({ status: "success", route: value[0].bus_route, _id: value[0]._id, bus_name: value[0].bus_name })
                else {
                    throwError("no record found", 404, next)
                }
            }).catch(err => {
                console.log("err", err)
            })
        } else {
            throwError("busname  is missing", 400, next)
        }
    }

    static addRoute(req, res, next) {
        let { busName, route } = req.body;
        if (!busName && !route) {
            return throwError("invalid body", 422, next);
        } else {
            let busRouteDoc = new BusRoute({
                bus_name: busName,
                bus_route: route
            });
            busRouteDoc.save((error, doc) => {
                if (!error) {
                    return res.json({ status: 'success', data: doc });
                }
                return throwError(error.message, 500, next);
            })
        }
    }

    static deleteRoute(req, res, next) {
        let { id } = req.params;
        if (!id) {
            return throwError("invalid request", 422, next);
        } else {
            BusRoute.findByIdAndDelete({ _id: id }, (error, doc) => {
                if (!error && doc) {
                    return res.json({ status: "success", data: doc });
                }
                return throwError(error.message, 500, next);
            })
        }
    }

    static updateRoute(req, res, next) {
        let { busName, route, id } = req.body;
        if (!busName || !route || !id) {
            return throwError("invalid request", 422, next);
        } else {
            let updateObj = {
                bus_name: busName,
                bus_route: route
            }
            BusRoute.findOneAndUpdate({ _id: id }, updateObj, { new: true }, (error, doc) => {
                if (!error && doc) {
                    return res.json({ status: 'success', data: doc });
                }
                return throwError(error.message, 500, next);
            })
        }
    }
}

module.exports = BusRouteClass;