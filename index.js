var io = require('socket.io').listen(5647);
io.on('connection', function(socket){
  console.log('connected');
  socket.on('say hi', function(msg){
    console.log(msg);
    io.emit('say hi', msg);
  });

  socket.on('request::missions', function(msg){
    console.log(msg);
    io.emit('request::missions', {
      message: 'I have no missions for you, yet.',
      missionsCount: -1
    });
  });

  socket.on('request::challenges', function(msg){
    console.log(msg);
    io.emit('request::challenges', {
      message: 'I have no challenges for you, yet.',
      challengesCount: -1
    });
  });

  socket.on('request::accomplishmentsByUser', function(msg){
    console.log(msg);
    io.emit('request::accomplishmentsByUser', {
      message: 'I have no accomplishments registred for you, yet.',
      accomplishmentsCount: -1
    });
  });

  socket.on('user::add', function(msg){
    console.log(msg);
    io.emit('user::add', {
      message: 'I have no idea how to add user, yet.'
    });
  });

  socket.on('user::login', function(msg){
    console.log(msg);
    io.emit('user::login', {
      message: 'I have no idea how to welcome a user, yet.'
    });
  });

  socket.on('user::bye', function(msg){
    console.log(msg);
    io.emit('user::bye', {
      message: 'I have no idea how to say bye to a user, yet.'
    });
  });

  socket.on('user::enterCode', function(msg){
    console.log(msg);
    io.emit('user::enterCode', {
      message: 'I have no idea how to enter a code given by a user, yet.'
    });
  });

});
