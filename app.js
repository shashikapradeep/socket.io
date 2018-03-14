var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function() {
    console.log('listening on *:3000');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var clients = 0;
io.on('connection', function (socket) {
    console.log('A user connected');

    //Send a message after a timeout of 4seconds
   setTimeout(function() {
      socket.send('Sent a message 4seconds after connection!');
   }, 4000);

   clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });

    socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
})

