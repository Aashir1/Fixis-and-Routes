var db = require('../dbConnection');
const Schema = db.Schema;
const RouteSchema = new Schema({
    bus_name: {
        type: Schema.Types.String,
        required: [true, "bus name is required"],
        validate: {
            validator: (name) => name.length >= 3,
            message: 'Bus name must be 5 character longer'
        }
    },
    bus_route: {
        type: Schema.Types.String,
        required: [true, "bus route is required"]
    },
    wayPoint: {
        type: Schema.Types.Array,
        required: [true, "waypoints are required"],
        validate: {
            validator: (wayPoint) => wayPoint.length == 10,
            message: 'WayPoints must be contain 10 elements'
        }
    }
});
const BusRoute = db.model("BusRoute", RouteSchema, "BusRoutes");


module.exports = BusRoute;