var db = require('../dbConnection');
const Schema = db.Schema;
const InfoSchema = new Schema({
    bus_name: {
        type: Schema.Types.String
    },
    bus_driver_name: {
        type: Schema.Types.String
    },
    bus_driver_phone: {
        type: Schema.Types.String
    },
    stop_info: {
        type: Schema.Types.String
    }
});
const BusInfo = db.model("BusInfo", InfoSchema, "BusInfos");
module.exports=BusInfo;