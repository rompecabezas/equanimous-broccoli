var io = require('socket.io').listen(9192);
io.on('connection', function(socket){
  console.log('user connected');

  socket.on('user::arrives', function(msg){
    console.log(msg);
    io.emit('user::arrives', {
      message: 'I have no idea how to welcome user, yet.'
    });
  });

  socket.on('user::responses', function(msg){
    console.log(msg);
    io.emit('user::responses', {
      message: 'I have no idea how to save user responses, yet.'
    });
  });

});
