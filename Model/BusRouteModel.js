var db = require('../dbConnection');
const Schema = db.Schema;
const RouteSchema = new Schema({
    bus_name: {
        type: Schema.Types.String
    },
    bus_route:{
            
    }


});
const BusRoute = db.model("BusRoute", RouteSchema,"BusRoutes");


module.exports = BusRoute;