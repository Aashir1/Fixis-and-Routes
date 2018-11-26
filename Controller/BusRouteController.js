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
}

module.exports = BusRouteClass;