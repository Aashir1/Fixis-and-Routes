module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A client just joined on', socket.id);
        socket.on("message", (message) => {
            console.log(message);
            socket.emit("messages", message)
        })
    });
}