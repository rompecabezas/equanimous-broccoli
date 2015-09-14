var io = require('socket.io').listen(9129);
var numPlayers = 0;
var peopleOnline = 0;

io.on('connection', function(socket){
  console.log('user connected');
  peopleOnline++;

  socket.on('user::arrives', function(msg){
    console.log(msg);
    io.emit('user::arrives', {
      peopleOnline: peopleOnline
    });
  });

  socket.on('user::responses', function(msg){
    console.log(msg);

    if(msg.rplace == "DF" ){
      console.log("oh yeah");
    }
    else{
      console.log("nope");
    }

    socket.emit('user::responses', {
      message: 'Received. We\'ll announce the winner on September 17 at our facebook fanpage: https://www.faceboko.com/creepypastas.'
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    --peopleOnline;
    io.emit('user::left', {
      peopleOnline: peopleOnline
    });
  });

});
