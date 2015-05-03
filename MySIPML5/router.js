var dao = require('./userDao.js');
module.exports = function(app, cors)
{
	var corsOptions = {
  		origin: 'http://localhost:3030'
	};	
	app.get('/',function(req,res){
		console.log('server is running');
		res.redirect('/home');
	});

	app.get('/home', cors(corsOptions), function(req, res){
		console.log("Loading Index Page..");
		res.render('index.html');
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
		res.send("Success");
        res.end();
	});

	app.get('/views/dashboard', function(req, res){
		console.log("Loading Login Page..");
		res.render('dashboard.html');
	});

}
