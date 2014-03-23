var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var Tag = new Schema({
	name : String,
	description : String
});

var Post = new Schema({
	id : {type: Number, unique : true},
	title : String,
	featured_image : String,
	content : String,
	published : Boolean,
	date : Date,
	tags : [Tag]
});

var Page = new Schema({
	id : {type: Number, unique : true},
	title : String,
	content : String,
	published : Boolean,
	date : Date,
	parent : {type: String, default :'no_parent'},
	order : {type : Number, default : 0},
	tags : [Tag]
});

var UserInfo = new Schema({
	username : {type : String, unique : true, index :true },   
	full_name : {type : String},
	email : {type : String},          
	is_initialized :{type : Boolean, default : 0},
	posts : [Post],
	pages : [Page]
});
UserInfo.set('autoIndex', false);   // Change it to
mongoose.model('UserInfo', UserInfo); 

mongoose.connect('mongodb://localhost:27017/temple');
