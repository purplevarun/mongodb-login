const express = require ('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost/login-promject';
mongoose.connect (mongoURL,{
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if (err)
		console.log('error = ',err);
	else console.log('mongo connected');
});