var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var masterId = '';

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/janken.html');
});

app.get('/master', function(req, res) {
  res.sendFile(__dirname + '/master.html');
});

io.on('connection', function(socket) {
  io.emit('activity', { count: Object.keys(io.sockets.sockets).length });

  socket.on('janken', function(hand) {
    console.log(socket.id);
    console.log(hand.value);

    if (hand.master) {
      masterId = socket.id;
      socket.broadcast.emit('opponent', { id: socket.id, value: hand.value, timestamp: Date.now() });
    } else {
      socket.to(masterId).emit('opponent', { id: socket.id, value: hand.value});
    }
  });

  socket.on('disconnect', function() {
    io.emit('activity', { count: Object.keys(io.sockets.sockets).length });
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
