const express = require('express')
const app = express();
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
const port = process.env.PORT || 3000;
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost';
const dbname = 'db1';
const dataInsert = (name,pass,email) => {
	MongoClient.connect(
		url,
		{useNewUrlParser:true,useUnifiedTopology:true},
	 	(err,client) =>{
		if (err)
			return false;
		console.log('mongo connected');
		const db = client.db(dbname);
		var data = {
			'name' : name,
			'emailID' : email,
			'password' : pass 
		};
		db.collection ("test").insertOne(data);
		
	});
	return true;
};
// console.log(dataInsert('varun','pepepe','purplevarun'));
app.use (bodyparser.urlencoded({extended:true}));
// app.use (express.json());
app.set ('view engine','ejs');
app.use (express.static('static'));
app.get('/',(req,res) => {
	res.redirect ('/home');
});
app.get('/home', (req,res) => {
	res.render ('homepage');
});
app.get ('/login', (req,res) => {
	res.render('login');
});
app.get('/register', (req,res) => {
	res.render('register');
})
app.post('/register', (req,res) => {
	var name = req.body.username;
	var pass = req.body.pass;
	var email = req.body.emailid;
	console.log(`Name = ${name}, Password = ${pass}, Email = ${email}`);
	if (dataInsert(name,pass,email)){
		res.render('success');
	}
	else {
		res.render('failed');
	}
});
app.listen(port,() => {
	console.log('server started on ',port);
});