const express = require ('express');
const app = express ();
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const LocalStrategy = require ('passport-local');
const passportMongoose = require('passport-local-mongoose');
const User = require ('./models/User');

mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify',true);
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);

const mongourl = 'mongodb://localhost/db1';

mongoose.connect (mongourl, (err,client) => {
	if (err)
		console.log (err);
	else console.log ('mongo connected');
});

app.set ('view engine','ejs');
app.use (bodyParser.urlencoded({extended:true}));

app.use (require ('express-session')({
	secret : 'hehe boi',
	resave : false,
	saveUninitialized : false
}));

app.use (passport.initialize());
app.use (passport.session());

passport.use (new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deseralizeUser(User.deserializeUser());


// -----------------------------------------------------------------------------

app.get ('/', (req,res) => {
	res.render ('homepage');
});

app.get ('/login', (req,res) => {
	res.render ('login');
});

app.get ('/register', (req,res) => {
	res.render ('register');
});
