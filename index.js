const express = require ('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoURL = 'mongodb://localhost/login-promject';
const port = process.env.PORT || 3000;

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
	store : MongoStore.create({
		mongooseConnection : db
	})
}));

app.set ('view engine', 'ejs');
app.use (bodyparser.json());
app.use (bodyparser.urlencoded({extended:false}));


app.listen(port, () => {
	console.log('server running on ',port);
});