const express = require ('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoURL = 'mongodb://localhost/login-promject';
const port = process.env.PORT || 3000;
const User = require('models/User');
mongoose.connect (mongoURL,{
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if (err)
		console.log('error = ',err);
	else console.log('mongo connected');
});

const db = mongoose.connection;
db.on ('error', console.error.bind(console,'connection error:'));
db.once ('open', () => {});

app.use (session ({
	secret : 'purplevarun',
	resave : true,
	saveUninitialized: false,
	store : new MongoStore({
		mongooseConnection : db
	})
}));

app.set ('view engine', 'ejs');
app.use (bodyparser.json());
app.use (bodyparser.urlencoded({extended:false}));

app.get ('/', (req,res) => {
	res.render ('home');
});

app.get ('/login', (req,res) => {
	res.render ('login');
});

app.get ('/register', (req,res) => {
	res.render ('register');
});

app.post ('/register', (req,res,next) => {
	console.log(req.body);
	var info = req.body;
	var newUser = new User({
		emailid: info.emailid,
		username: info.username,
		password: info.password
	});
});

app.listen(port, () => {
	console.log(`server running on ${port}`);
});
