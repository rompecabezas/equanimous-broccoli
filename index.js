var io = require('socket.io').listen(5647);
io.on('connection', function(socket){
  console.log('connected');
  socket.on('say hi', function(msg){
    console.log(msg);
    io.emit('say hi', msg);
  });

  socket.on('request::missions', function(msg){
    console.log(msg);
    io.emit('request::missions', 'I have no missions for you, yet.');
  });

  socket.on('request::challenges', function(msg){
    console.log(msg);
    io.emit('request::challenges', 'I have no challenges for you, yet.');
  });

  socket.on('request::accomplishmentsByUser', function(msg){
    console.log(msg);
    io.emit('request::accomplishmentsByUser', 'I have no accomplishments registred for you, yet.');
  });

  socket.on('user::add', function(msg){
    console.log(msg);
    io.emit('request::add', 'I have no idea how to add user, yet.');
  });

  socket.on('user::login', function(msg){
    console.log(msg);
    io.emit('request::login', 'I have no idea how to give a user login, yet.');
  });

  socket.on('user::bye', function(msg){
    console.log(msg);
    io.emit('request::bye', 'I have no idea how to say bye to a user, yet.');
  });

  socket.on('user::enterCode', function(msg){
    console.log(msg);
    io.emit('request::enterCode', 'I have no idea how to enter a code given by a user, yet.');
  });

});
