var io = require('socket.io').listen(9129);
var numPlayers = 0;
var peopleOnline = 0;

io.on('connection', function(socket){
  console.log('user connected');
  usersOnline++;

  socket.on('user::arrives', function(msg){
    console.log(msg);
    io.emit('user::arrives', {
      peopleOnline: peopleOnline
    });
  });

  socket.on('user::responses', function(msg){
    console.log(msg);
    io.emit('user::responses', {
      message: 'I have no idea how to save user responses, yet.'
    });
  });

});
