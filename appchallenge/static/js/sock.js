var socket = io.connect('http://localhost:8080/appchallenge');
var user = null;

function trace(text) {
	console.log((performance.now() / 1000).toFixed(3) + ": " + text);
}

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	$('#userPopup').modal('show');
});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateUsers', function(data) {
	console.log("Updating Users");
	$('#userInfo').empty();
	user = JSON.parse(data);
	console.log(user);
	$('#userInfo').append('<li>'+ user.userName+'</li>')
	$('#userInfo').append('<li>'+ user.userMailID+'</li>')
	$('#userInfo').append('<li>'+ user.available+'</li>')
});

socket.on('updateRooms', function(status, data){
	if(status){
		console.log(data);
		var rooms = JSON.parse(data);

		if ( $.fn.dataTable.isDataTable( '#roomDetails' ) ) {
				console.log("Deleting existing table");
				$("#roomDetails").dataTable().fnDestroy();
			}
			
			$('#roomDetails').dataTable( {
				"data": rooms,
				"aoColumns": [
				{
					"mData":"roomName",
					"sTitle": "Room Name",
			  	},
			  	{
			  		"mData":"desc",
				    "sTitle": "Description",
				    "orderable": false
			  	},
			  	{
			  		"mData":"host.userName",
				    "sTitle": "Host",
			  	},
			  	{
			  		"mData":"count",
				    "sTitle": "# of participants",
			  	},
        		{   
        			"sTitle": "",
        			"mData": null,
                	"orderable": false,
        			"mRender": function (obj) {
        				return '<a class="btn btn-success" href="/rooms/'+obj.roomID+'" onclick="joinRoom('+obj.roomID+')">' + 'Join' + '</a>';
        			}
        		},
        		{   
        			"sTitle": "",
        			"mData": null,
                	"orderable": false,
        			"mRender": function (obj) {
        				return '<a class="btn btn-warning" onclick="leaveRoom('+obj.roomID+')">' + 'Leave' + '</a>';
        			}
        		}
			  ]
	   		});
	}else{
		$('#statusMsgsList').empty();
		$('#statusMsgsList').append('<li> No rooms available <li>');
	}
});

socket.on('statusUpdate', function(msg){
	console.log("status updated");
	$('#statusMsgsList').empty();
	$('#statusMsgsList').append('<li>' + msg + '<li>');
});

socket.on('updateRoomTable', function(roomData){
	var data = JSON.parse(roomData);
	console.log(data);
	var table = $('#roomDetails').DataTable();
	table.rows().indexes().each( function (idx) {
		var d = table.row( idx ).data();
		console.log(d.roomID+" "+data.roomID);
	    if(d.roomID == data.roomID){
	    	console.log("row found");
	    	console.log(d);
	    	d.count = data.count;
	    	table.row( idx ).data(d);
	    }
	} );
	 
	// Draw once all updates are done
	table.draw();
});

socket.on('sendGroupMsg', function(status){
	alert(status);
});

function joinRoom(roomID){
	var data = {"roomID":roomID, "user":user};
	trace("Joining Room");
	console.log(data);
	socket.emit('joinRoom', data);
}

function leaveRoom(roomID){
	var data = {"roomID":roomID, "user":user};
	trace("Leaving Room");
	console.log(data);
	socket.emit('leaveRoom', data);
}

$(document).ready(function(){
	$('#addRoom').click(function(){
		$('#roomPopup').modal('show');
	});
});	