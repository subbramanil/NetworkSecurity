var express = module.exports = require('express');
var app = express();
var session  = require('express-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);


app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
var oneDay = 86400000;
app.use(express.static(__dirname + '/static',{maxAge: oneDay}));

require('./router/main')(app);
var dao = require('./userDao.js');
var nsp = io.of('/appchallenge');

var server = http.listen(process.env.PORT || 8080,function(){
	logMsg("Server listening on port "+server.address().port);
});

var getRoomDetails = function(data){
    logMsg("server.getRoomDetails() entry");
    var room = dao.findRoom();
    logMsg(room);
    logMsg("server.getRoomDetails() exit");
    return room;
};

// module.exports = getRoomDetails; 

nsp.on('connection', function(socket){
    logMsg('user is connected at: '+ socket.id);

        var status;

        socket.on('addUser', function(userData){
            logMsg("server.addUser() entry");
            var user = dao.addUser(userData);
            // add the client's username to the global list
            socket.currentUser = user;
            // echo to client they've connected
            // socket.emit('update', user.name + ' has connected');
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('statusUpdate', user.userName + ' has connected');
            // update the list of users in chat, client-side
            socket.emit('updateUsers', JSON.stringify(user));
            logMsg("server.addUser() exit");
        });

        socket.on('getAllRooms', function(){
            logMsg("server.getAllRooms() entry");
            var rooms = dao.getAllRooms();
            if(rooms.length!=0)
                status = true;
            else
                status = false;
            socket.emit('updateRooms', status, JSON.stringify(rooms));
            socket.broadcast.emit('updateRooms', status, JSON.stringify(rooms));    
            logMsg("server.getAllRooms() exit");
        });

        socket.on('addRoom', function(roomData){
            logMsg("server.addRoom() entry");
            socket.join(roomData.roomName);
            var roomsList = dao.addRoom(roomData, socket.currentUser);
            socket.emit('updateRooms', true, JSON.stringify(roomsList));
            socket.broadcast.emit('updateRooms', true, JSON.stringify(roomsList));
            socket.emit('statusUpdate', roomData.roomName + ' has been created');
            logMsg("server.addRoom() exit");
        });

        socket.on('joinRoom', function(data){
            logMsg("server.joinRoom() entry");
            logMsg(data);
            // var numClients = io.sockets.clients(room).length;
            // logMsg("No of Clients")
            var room = dao.joinRoom(data);
            logMsg(room);
            if(room != null){
                socket.join(room.roomName);    
                socket.emit("updateRoomTable", JSON.stringify(room));
                socket.broadcast.emit("updateRoomTable", JSON.stringify(room));
                socket.emit('statusUpdate', "Joined room "+room.roomName)
                socket.broadcast.to(room.roomName).emit('statusUpdate', data.user.userName+" has joined "+room.roomName)
            }else{
                // socket.broadcast.emit('statusUpdate', 'New User has connected');
            }
            logMsg("server.joinRoom() exit");
        });

        socket.on('leaveRoom', function(data){
            logMsg("server.leaveRoom() entry");
            logMsg(data);
            // var numClients = io.sockets.clients(room).length;
            // logMsg("No of Clients")
            var room = dao.leaveRoom(data);
            logMsg(room);
            if(room != null){
                socket.leave(room.roomName);    
                socket.emit("updateRoomTable", JSON.stringify(room));
                socket.broadcast.emit("updateRoomTable", JSON.stringify(room));
                socket.emit('statusUpdate', "Left room "+room.roomName)
                socket.broadcast.to(room.roomName).emit('statusUpdate', data.user.userName+" has left "+room.roomName)
            }else{
                // socket.broadcast.emit('statusUpdate', 'New User has connected');
            }
            logMsg("server.leaveRoom() exit");
        });

        socket.on('getRoomDetails', function(data){
            logMsg("server.getRoomDetails() entry");
            logMsg(data);
            var room = dao.findRoom(data);
            logMsg(room);
            if(room != null){
                socket.emit('updateRoomDetails', JSON.stringify(room));
            }
            logMsg("server.getRoomDetails() exit");
        });

        socket.on('disconnect', function(){
            logMsg("server.disconnect() entry");
            logMsg('user disconnected');
            logMsg("server.disconnect() exit");
        });

        socket.on('message', function (message) {
            log('Got message: ', message);
            // For a real app, should be room only (not broadcast)
            socket.broadcast.emit('message', message);
        });

        function logMsg(){
            var array = [">>> Message from server: "];
            for (var i = 0; i < arguments.length; i++) {
                array.push(arguments[i]);
            }
            socket.emit('log', array);
        }
});
