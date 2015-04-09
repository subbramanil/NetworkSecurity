var chatApp = angular.module('chatApp', []);

chatApp.controller('UserController', ['$scope', function($scope){
  
  $scope.signUp = function() {
    console.log("angularjs.signUp entry");
    if($scope.userName && $scope.userEmail){
      var userData = {"name":$scope.userName, "emailID":$scope.userEmail, "status":$scope.userStatus};
      socket.emit('addUser', userData);
      console.log(userData);
      // Get all the available rooms
      socket.emit('getAllRooms');
    }
    console.log("angularjs.signUp exit");
  };

  $scope.addRoom = function(){
    console.log("angularjs.addRoom() entry");
    if($scope.roomName && $scope.roomDesc)
    var roomData = {"roomName":$scope.roomName, "desc":$scope.roomDesc};
    socket.emit('addRoom', roomData);
    console.log("angularjs.addRoom() exit");
  };
}]);

chatApp.controller('RoomController', ['$scope', function($scope){

  // $scope.usersList = [
  //   {
  //     userMailID: "amani@gmail.com", userName: "mani", available: "Offline"
  //   },
  //   {
  //     userMailID: "kailash@gmail.com", userName: "kailash", available: "Offline"
  //   }
  // ];

  $scope.localUser = {
      userMailID: "amani@gmail.com", userName: "mani", available: "Offline"
    };
  $scope.remoteUser = {
      userMailID: "kailash@gmail.com", userName: "kailash", available: "Offline"
    };



}]);