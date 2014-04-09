var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var error = require('./error_handler');
var fs = require('fs');
var jade = require('jade');


exports.page = function(req, res, next){
	var username = req.user.username;
	UserInfo.findOne({'username' : username}, 'theme', function(err, user){
		var theme_path = 'user_files/'+ username +'/themes/'+user.theme;
		var layout = fs.readFileSync(theme_path +'/layout_user.jade', 'utf8');
		//layout = 'include "views/preview" \n'+ layout;
		var menu = 'rohith';
		var compiled = jade.compile(layout);
		var html = compiled({menu : menu, side_bar : 'vineeth'});
		res.send(html)
	});
};