var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
	  local: {
	  	  email: { type: String, required: true }
	  	, password: { type: String, required: true }
	  }
	  , name: String
	  , instagramAccount: String
	  , isSeller: Boolean
})


// hash password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// exporting model
module.exports = mongoose.model('User', UserSchema);