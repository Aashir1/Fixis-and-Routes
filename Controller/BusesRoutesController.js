let BusRoutes = require('../Model/BusRouteModel');
let throwError = require('../ErrorHandler/Error');
class BusesRoutes {
    static getBusesRoutes(res, next) {
        BusRoutes.find({}, (error, result) => {
            if (!error) {
                if (result) {
                    return res.json({ status: "success", data: result });
                } else {
                    return throwError("no record found", 404, next);
                }
            }
            return throwError(error.message, 400, next);
        })
    }
}


module.exports = BusesRoutes;