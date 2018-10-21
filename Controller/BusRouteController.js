var BusRoute = require('../Model/BusRouteModel');

class BusRouteClass {
    static getRoute(id, res, next) {
        console.log("id", id)
        if (id) {
            BusRoute.find({ "bus_name": id }).then(value => {
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
function throwError(message, status, next) {
    let err = new Error();
    err.status = status;
    err.message = message;
    next(err);
}
module.exports = BusRouteClass;