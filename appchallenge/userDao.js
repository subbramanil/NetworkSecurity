var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

function User(data){
    this.userName = data.name;
    this.userMailID = data.emailID;
    this.available = data.status;

    this.getUserInfo =  function(){
        return "userName: " + this.username + " emailID:" + this.userMailID + " available: " + this.available;
    };

}

function Room(data, host){
    this.users = new Array();
    this.count = 1; // Host is present
    this.roomName = data.roomName;
    this.roomID = roomIDGen++;
    this.desc = data.desc;
    this.host = host;

    this.addUser = function(data){
        if(this.host.userMailID != data.userMailID){
            this.users.push(data);
            this.count++;
        }
    };

    this.removeUser = function(data){
        if(this.host.userMailID != data.userMailID){
            this.users.pop(data);
            this.count--;
        }
    }
}

var roomIDGen = 0;
var usersList = new Array();
var roomsList = new Array();

module.exports = {

    addUser : function(userData){
        console.log("dao.addUser() entry");
        var user = new User(userData);
        usersList.push(user);
        console.log("No of Users: "+usersList.length);
        console.log(user);
        console.log("dao.addUser() exit");
        return user;
    },

    getAllRooms : function(){
        console.log("dao.getAllRooms() entry");
        console.log('No of Rooms available: '+roomsList.length)
        console.log("dao.getAllRooms() exit");
        return roomsList;
    },

    addRoom : function(roomData, host){
        console.log("dao.addRoom() entry");
        var room = new Room(roomData, host);
        console.log(room);
        roomsList.push(room);
        console.log("dao.addRoom() exit");
        return roomsList;
    },

    findRoom : function(data){
        var room;
        $(roomsList).each(function(key, value) {
            if(data.roomID == key){
                console.log("room found");
                room = $(roomsList).get(key);
            }
        });
        return room;
    },

    joinRoom : function(data){
        console.log("dao.joinRoom() entry");
        var room = this.findRoom(data);
        console.log(room);
        if(room != null){
            room.addUser(data.user); 
        }else{
            console.log("Room not found");
        }   
        console.log("dao.joinRoom() exit");
        return room;
    },

    leaveRoom : function(data){
        console.log("dao.leaveRoom() entry");
        var room = this.findRoom(data);
        if(room != null){
            room.removeUser(data.user);
        }
        console.log("dao.leaveRoom() exit");
        return room;
    },

    // getRoomDetails : function(roomID){
    //     console.log("dao.getRoomDetails() entry");
    //     var room = this.findRoom(data);
    //     console.log("dao.getRoomDetails() exit");
    // }

};