module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A client just joined on', socket.id);
        // socket.on("message", (message) => {
        //     console.log(message);
        //     socket.emit("messages", message)
        // })
        socket.on("message", (message) => {
            let json = JSON.parse(`{${message}}`);
            console.log("json", json);
            io.emit("HU 02", json);
        });
        
        socket.on('disconnect', function () {
            console.log("disconnected", socket.id)
        });
    });
}
