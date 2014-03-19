var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var UserInfo = new Schema({
	username : {type : String, unique : true, index :true },   
	full_name : {type : String},
	email : {type : String},          
	is_initialized :{type : Boolean, default : 0}
});
UserInfo.set('autoIndex', false);   // Change it to
mongoose.model('UserInfo', UserInfo); 

mongoose.connect('mongodb://localhost:27017/temple');
