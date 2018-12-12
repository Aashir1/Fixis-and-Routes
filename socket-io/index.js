var LiveTrackController = require("../Controller/LiveTrackController");
module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A client just joined on', socket.id);
        // socket.on("message", (message) => {
        //     console.log(message);
        //     socket.emit("messages", message)
        // })
        socket.on("message", (message) => {
            // let json = JSON.parse(`{${message}}`);
            // console.log("json", json);
            LiveTrackController.addCurrLocation(message);
            io.emit(json.bus_name, message);
        });

        socket.on('disconnect', function () {
            console.log("disconnected", socket.id);
        });
    });
}
