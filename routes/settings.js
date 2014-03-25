var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var error = require('./error_handler');

exports.general = {
	'get' : function(req, res, next){
		res.send('From get');
	},
	'post' : function(req, res, next){
		res.send('from post');
	}
};