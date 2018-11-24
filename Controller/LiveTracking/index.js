let LiveTrackingModel = require('../../Models/LiveTracking');

class LiveTracking {
    static saveLocation(data) {
        if (data.lat && data.lng && data.busName) {
            let locationDocument = new LiveTrackingModel(data);
            locationDocument.save((error, data) => {
                if (!error) {
                    console.log('data is stored into database: ', data);
                }
            });
        }
    }
}

module.exports = LiveTracking;