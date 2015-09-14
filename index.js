var io = require('socket.io').listen(9129);
var validator = require('validator');
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

    if(msg.rcplace == "df" ){
      if(false == insertRows(name,email)){
        console.log("bad email or bad name");
      }
      else {
        console.log("oh, yeah");
      }
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


"use strict";

var sqlite3 = require('sqlite3').verbose();
var db;

function openDB() {
    console.log("openDB gritadores");
    db = new sqlite3.Database('gritadores.sqlite3', createTable);
}


function createTable() {
    console.log("createTable users");
    db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, email TEXT)", insertRows);
}

function insertRows(name, email) {

  if( !validator.isEmail(msg.user.email) || !validator.isAlphanumeric(msg.user.name)){
   return false;
  }

    console.log("insert new user");
    var stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.run(name, email);
    stmt.finalize(readAllRows);
}

function readAllRows() {
    console.log("readAllRows users");
    db.all("SELECT rowid AS id, name, email FROM users", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.name + ";" + row.email);
        });
//        closeDb();
    });
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function initDB() {
    openDB();
}

initDB();
