const express = require ('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoURL = 'mongodb://localhost/login-promject';
const port = process.env.PORT || 3000;
const User = require('./models/User');
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
	res.render ('login',{'msg':''});
});

app.get ('/register', (req,res) => {
	res.render ('register');
});

app.post ('/register', (req,res) => {
	console.log(req.body);
	var info = req.body;
	var newUser = new User({
		emailid: info.emailid,
		username: info.username,
		password: info.pass
	});

	newUser.save ((err,user) => {
		if (err){
			console.log('there was error in user = ',err);
			res.render ('result-page',{'result':'Failed'});
		}
		else{
			console.log('user inserted');
			res.render ('result-page',{'result':'Successful'});
		} 
	});
});

app.post ('/login', (req,res) => {
	var em = req.body.emailid;
	var pass = req.body.password;
	User.findOne({emailid:em}, (err,data) => {
		if (data){ // if email present
			if (data.pass==pass){
				console.log('login success');
				console.log(data);
				res.render('welcome');
			}
			else {
				res.render('login',{'msg':'Wrong Password..'})
			}
		}
		else { // email not present
			res.render ('login',{'msg':'Email not found..'});
		}
	})
});
app.listen(port, () => {
	console.log(`server running on ${port}`);
});
