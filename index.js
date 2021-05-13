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
	var counter;
	User.findOne({}, (err,data)=>{
		if (data){
			console.log('if data = ',data);
			counter = data.uniqueID + 1;
		}
		else counter = 1;
	
		console.log('counter = ',counter);
		var newUser = new User({
			uniqueID: counter,
			emailid: info.emailid,
			username: info.username,
			password: info.pass
		});
		console.log('schema = ',newUser);
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
});
app.get ('/welcome', (req,res) => {
	console.log('welcome to welcome');
	User.findOne({uniqueID:req.session.userId}, (err,data) =>{
		console.log('user data = ',data);
		if (!data){
			res.render('result-page',{'result':'There was problem in Login..'});
		}
		else 
			res.render('welcome',{name:data.username,email:data.emailID,password:data.password});	
	});
});
app.post ('/login', (req,res) => {
	var em = req.body.emailid;
	var pass = req.body.pass;
	User.findOne({emailid:em}, (err,data) => {
		if (data){ // if email present
			console.log(`data.pass = ${data.password} and body.pass = ${pass}`);
			if (data.password==pass){
				console.log('login success');
				console.log(data);
				req.session.userId = data.uniqueID;
				res.redirect('/welcome');
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
