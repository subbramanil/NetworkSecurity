var dao = require('./userDao.js');
module.exports = function(app, cors)
{
	var corsOptions = {
  		//origin: 'http://localhost:3030'
	};	
	app.get('/',function(req, res){
		console.log('server is running');
		res.redirect('/home');
	});

	app.get('/home', cors(corsOptions), function(req, res){
		console.log("Loading Index Page..");
		res.render('home.html');
	});

	app.get('/views/login', function(req, res){
		console.log("Loading Login Page..");
		res.render('login.html');
	});

    app.get('/views/test', function(req, res){
        console.log("Loading test Page..");
        res.render('call.html');
    });

	app.get('/views/callCtrl', function(req, res){
		console.log("Loading Call control module..");
		res.render('callCtrl.html');
	});

    app.get('/views/testLogin', function(req, res){
        console.log("Loading test Page..");
        res.render('testLogin.html');
    });

    app.get('/views/expert', function(req, res){
        console.log("Loading expert Page..");
        res.render('expertSettings.html');
    });

	app.get('/views/register', function(req, res){
		console.log("Loading Register Page..");
		res.render('register.html');
	});

	app.post('/user/registerUser', function(req, res){
		console.log("Registering User");
        //console.log(req.body.g-recaptcha-response);
		dao.addUser(req.body.data);

        //$.ajax({
        //    url: 'https://www.google.com/recaptcha/api/siteverify',
        //    dataType: 'text/json',
        //    type: 'post',
        //    contentType: 'application/x-www-form-urlencoded',
        //    data: {"secret":"6LfuQQYTAAAAAJfp8bFVb5VoSCGo-BvPi-KO7Bam", "response":"" },
        //    success: function( data, textStatus, jQxhr ){
        //        console.log(data);
        //    },
        //    error: function( jqXhr, textStatus, errorThrown ){
        //        console.log( jqXhr + errorThrown );
        //    }
        //});

		res.send("Success");
        res.end();
	});

	app.get('/views/dashboard', function(req, res){
		console.log("Loading Login Page..");
		res.render('dashboard.html');
	});

	// Just for testing purpose

    app.get("/user/sync", function(req, res){
        console.log("Sync data sent from Android app");
        dao.writeFile("data");
        res.send("success");
    });

}
