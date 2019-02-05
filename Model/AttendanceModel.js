var db = require('../dbConnection');
const Schema = db.Schema;
const AttendanceSchema = new Schema({
    bus_name: {
        type: Schema.Types.String,
        required: [true, "bus_name is required"]
    },
    date: {
        type: Schema.Types.String,
        required: [true, "date is required"]
    },
    rfid: {
        type: Schema.Types.String,
        required: [true, "rfid is required"]
    }


});
const DailyAttendance = db.model("DailyAttendance", AttendanceSchema);


module.exports = DailyAttendance;