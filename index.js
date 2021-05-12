const express = require('express')
const app = express();
const mongodb = require('mongodb');
const port = process.env.PORT || 3000;
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
app.listen(port,() => {
	console.log('server started on ',port);
});