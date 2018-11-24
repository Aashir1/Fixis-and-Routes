let LiveTracking = require('../../Controller/LiveTracking');

module.exports = function (io) {
    console.log('from LiveTracking service 1: ');
    io.on('connection', function (socket) {
        console.log('from LiveTracking service 2: ');
        socket.on('location', (data) => {
            if (data.busName && data.lat && data.lng) {
                console.log('from LiveTracking service 3: ', data)
                //function save data into database;
                LiveTracking.saveLocation(data);
                socket.emit(`${data.busName}`, data);
            }
        })
    })
}