var express = require('express');
var app = express();
var http = require('http').Server(app);
var cors = require('cors');
var bodyParser = require('body-parser');

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
var oneDay = 86400000;
app.use(express.static(__dirname + '/static',{maxAge: oneDay}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

require('./router')(app, cors);

var server = http.listen(process.env.PORT || 8085, function(){
	console.log("Server is ready at port "+server.address().port);
});
