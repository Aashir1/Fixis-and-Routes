let mongoose = require('../../dbConfig');

let buslocationSchema = mongoose.Schema({
    lat: {
        type: String,
        required: true,
        trim: true
    },
    lng: {
        type: String,
        required: true,
        trim: true
    },
    busName: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('LiveTrackingModel', buslocationSchema);