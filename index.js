const express = require ('express');
const app = express ();
const mongoose = require ('mongoose');
const passport = require ('body-parser');
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

