var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path');

app.get('/', function (req, res) {
    // res.sendFile('./index.html');
    res.sendFile('index.html', { root: path.join(__dirname, './public') });
});

io.on('connection', function (socket) {
    console.log('a user is connected');

    socket.broadcast.emit('hi');

    socket.on('chat_message', function (msg) {
        console.log('Message: ', msg);
        io.emit('chat_message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user is disconnected');
    });
});


http.listen('3000', function () {
    console.log('listening on *:3000');
});