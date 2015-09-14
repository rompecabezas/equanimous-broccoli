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
    var stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
        stmt.run("mau, mauricio@navarromiranda.mx");
    stmt.finalize(readAllRows);
}

function readAllRows() {
    console.log("readAllRows users");
    db.all("SELECT rowid AS id, name, email FROM users", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.name + ", " + row.email);
        });
        closeDb();
    });
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function initDB() {
    openDB();
}

runChainExample();
