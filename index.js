var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/janken', function(req, res) {
  res.sendFile(__dirname + '/janken.html');
});

var janken = io.of('/janken');
janken.on('connection', function(socket) {
  console.log('janken connection');

  socket.on('janken', function(data) {
    console.log(data);
  });
});

io.on('connection', function(socket){
  console.log('connection : ' + Object.keys(io.sockets.sockets).length);

  socket.on('activity', function(data) {
    var name = data.name ? data.name : 'anonymous';
    console.log(data);

    switch(data.activity) {
      case 'connect':
        console.log(name + ' user connected');
        break;
    }
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnect');
    console.log('disconnect : ' + Object.keys(io.sockets.sockets).length);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
