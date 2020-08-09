
const socketio = require('socket.io');
const http = require('http');


const server = http.createServer((req, res) => {
});
const io = socketio(server);
const socketConnection = io;
server.listen(9883, 'localhost');
io.on('connection', (socket) => {
    this.appLog.info(new Date() + '--------WebSocket Client Connected--------------', socket.id);
});

module.exports = socketConnection