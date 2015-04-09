// var server = require('../server.js');
var dao = require('../userDao.js');

module.exports = function(app)
{
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/demo');
	});

	app.get('/index', function(req, res){
		res.render('index.html');
	});

	app.get('/demo', function(req, res){
		res.render('demo.html');
	});
	
	app.get('/home/?', function(req, res){
		//Render dynamic files
		console.log(req.query.key);
		app.locals.roomID = req.query.key;
		res.render('home.html');
		//render static files using sendFile
		//res.sendFile('./static/home.html');
	});

	app.get('/rooms/:roomID', function(req, res){
		var data = {"roomID":req.params.roomID};
		console.log(data);
		// var roomDetails = getRoomDetails(data)
		var roomDetails = dao.findRoom(data);
		console.log(roomDetails);
		// app.locals.roomID = req.query.key;
		res.render('rooms.html');
	});
}
