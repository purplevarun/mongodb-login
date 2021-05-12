const express = require('express')
const app = express();
const mongodb = require('mongodb');
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
			return console.log(err);
		console.log('mongo connected');
		const db = client.db(dbname);
		var data = {
			'name' : name,
			'emailID' : email,
			'password' : pass 
		};
		db.collection ("test").insertOne(data);
	});
};
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

});
app.listen(port,() => {
	console.log('server started on ',port);
});