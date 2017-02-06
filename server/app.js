"use strict";
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var EntryCtrl = require("./entry.controller");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(__dirname + '/../dist'));
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/run-down', function (err) {
    if (err)
        console.log('Error connecting to database');
    else
        console.log('Success in connecting to database');
});
var viewers = [];
var editors = [];
io.on('connection', function (socket) {
    console.log("[" + socket.id + "] User connected");
    socket.on('set user type', function (userType) {
        if (userType === 'view') {
            console.log("[" + socket.id + "] User is now a viewer");
            viewers.push(socket.id);
        }
        else {
            console.log("[" + socket.id + "] User is now an editor");
            editors.push(socket.id);
        }
    });
    socket.on('editor change', function (committee, text) {
        for (var _i = 0, viewers_1 = viewers; _i < viewers_1.length; _i++) {
            var id = viewers_1[_i];
            io.sockets.sockets[id].emit('server change', committee, text);
        }
    });
    socket.on('disconnect', function () {
        console.log("[" + socket.id + "] User disconnected");
        viewers = viewers.filter(function (id) { return id !== socket.id; });
        editors = editors.filter(function (id) { return id !== socket.id; });
    });
});
app.get('/api/entry', EntryCtrl.getEntries);
app.get('/api/entry/:id', EntryCtrl.getEntry);
app.post('/api/entry', EntryCtrl.createEntry);
app.put('/api/entry/:id', EntryCtrl.editEntry);
app["delete"]('/api/entry/:id', EntryCtrl.removeEntry);
app["delete"]('/api/entry', EntryCtrl.removeEntries);
app.get('*', function (req, res) {
    res.sendFile('index.html');
});
require('./seed.js');
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Server is listening at port: " + port);
});
