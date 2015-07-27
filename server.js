// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');


// App definition
var app = express();


// Serving app
app.use(express.static(__dirname + '/'));

require('./controllers/passport')(passport); // pass passport for configuration


// Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Controllers
var MainController = require('./controllers/MainController.js');
var EmailController = require('./controllers/EmailController.js');
var UserController = require('./controllers/UserController.js');


// required for passport
app.use(session({
    secret: 'makethisasupersecretstring',
    resave: true,
    saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


////////////////////////////////////
//////////// REST API //////////////
////////////////////////////////////


// Emails
app.post('/api/email', EmailController.sendEmail);

// Users
app.get('/api/users', UserController.getAll);

// Auth
app.post('/api/user', passport.authenticate('local-signup'), function (req, res) {
    res.redirect('/#/')
    res.json(req.use);
});

app.post('/auth/login', passport.authenticate('local-login'), function (req, res){
	if(!req.user){
		res.redirect('/#/login');
	}
    res.send(req.user); // redirect to the secure profile section
});

app.get('/api/auth', isAuth, function(req, res) {
	res.json(req.user);
});

// TODO: does this work?
app.get('/logout', function(req, res) {
	req.session.destroy();
    res.redirect('/#/');
});


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////



// Connections
var portNum = 3000;

var mongooseUri = 'mongodb://localhost/marketgram';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose pinstagramming on port: ', mongooseUri);
});


app.listen(portNum, function () {
    console.log('Node working magic on channel: ', portNum);
});



function isAuth(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.user){
        console.log(req.user);
        next();
    } else {
        console.log("not user");
   	// if they aren't redirect them to the home page
    	res.status(403).send('not allowed');
    }
}