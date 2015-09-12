var io = require('socket.io').listen(5647);
io.on('connection', function(socket){
  socket.on('say hi', function(msg){
    io.emit('say hi', msg);
  });
});
