var db = require('../dbConnection');
const Schema = db.Schema;
const LiveTrackSchema = new Schema({
    bus_name: {
        type: Schema.Types.String,
        required: [true, "bus_name is required"]
    },
    lat: {
        type: Schema.Types.Number,
        required: [true, "lat is required"]
    },
    lng: {
        type: Schema.Types.Number,
        required: [true, "lng is required"]
    },
    date: {
        type: Schema.Types.Date,
        default: Date.now()
    }


});
const LiveTrack = db.model("LiveTrackCoordinate", LiveTrackSchema);


module.exports = LiveTrack;