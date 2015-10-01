var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');



var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bCrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');

var app = express();


app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use(express.static(__dirname + '/public'));




//DB stuff
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./ssnoc.db');

//create tables


db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS user (username TEXT PRIMARY KEY, password TEXT, firstname TEXT, lastname TEXT, location TEXT, isadmin INTEGER)");
	
});


//var userdb=require('./userdb.js');

var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


app.get('/', function (req, res) {
 res.render('loginbootstrap', {pageMessage: 'Welcome!'});
});



app.post('/login', function (request, response){
	db.get("SELECT * from user where username=$username", {$username: request.body.username},
		function(err, row){
			if(err){
				console.log("error!" + err);
			} else if(row == undefined){
				response.render('signup', {pageMessage: 'User does not exist. Please sign up.'});
			} else {
				if(bCrypt.compareSync(request.body.password, row.password)) {
					response.render('welcomePage', {user: request.body.username});
				} else {
					response.render('signup', {pageMessage: 'Wrong password. Please sign up again.'});
				}
			}
		});
});

app.post('/signup', function (request, response){

	db.get("SELECT * from user where username=$username", {$username: request.body.username},
		function(err, row){
			if(err){
				console.log("error!" + err);
			 } else if(row == undefined){
			 	db.serialize(function(){	
					var stmt = db.prepare("INSERT INTO user (username, password, firstname, lastname, location, isadmin) VALUES (?,?,?,?,?,?)");
					stmt.run(request.body.username, createHash(request.body.password), request.body.firstname, request.body.lastname, request.body.location, 0);
					stmt.finalize();
				});
				response.render('welcomePage', {user: request.body.username});
			 } else {
			 	response.render('signUp', {pageMessage: 'Username already taken. Please choose another one.'});
			 }
		});
	
});

app.get('/signup', function (request, response){
	
	response.render('signup', {pageMessage: ''});
	
});

app.get('/welcomePage', function (req,res){
	
	
	res.render('welcomePage', {user: name});
});
app.post('/logout', function (req,res){
	res.render('loginbootstrap', {pageMessage: 'Thanks for visiting...Stay safe!'});
});

server.listen(app.get('port'));