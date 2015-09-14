var io = require('socket.io').listen(9129);
var validator = require('validator');
var peopleOnline = 0;
global.registredusers = 0;



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
    var inserted = true;
    var data = {};
    var somethingIsWrong = false;

    if( !validator.isEmail(msg.user.email) || !validator.isAlphanumeric(msg.user.name)){
      somethingIsWrong = true;
    }else{
      insertRows(msg.user.name,msg.user.email);
    }

    if(somethingIsWrong){
      data.error = 'Bad username or bad email';
      data.errorCode = 403;
    }else {

      console.log("REG:" + global.registredusers);

      data.success = 'success';
      data.code = 200;
      data.message = 'Thank you!';
      data.registredusers = global.registredusers;
    }


    socket.emit('user::responses', data);
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
    console.log("insert new user");
    var stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.run(name, email);
        stmt.finalize(readAllRows);
}

function readAllRows() {
    global.registredusers = 0;
    console.log("readAllRows users");
    db.all("SELECT rowid AS id, name, email FROM users", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.name + ";" + row.email);
            global.registredusers++;
            console.log("REG: " + global.registredusers)
        });
//        closeDb();
    });
}

function countAllRows(){
  console.log("count users");
//  var registredusers = db.run("SELECT COALESCE(MAX(rowid)+1, 0) FROM users");
  var registredusers = db.run("SELECT COUNT(DISTINCT email) AS NumberOfUsers FROM users");
  console.log(registredusers.toString() + "registred users");
  registredusers = registredusers.rows || '23';
  return registredusers.toString();
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function initDB() {
    openDB();
}

initDB();
