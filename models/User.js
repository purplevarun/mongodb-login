var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	        emailid: String,
	        username: String,
	        password: String,
}),

module.exports = mongoose.model('User', userSchema);
