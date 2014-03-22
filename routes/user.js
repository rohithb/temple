/*
 * User info related routes.
 */

var git = require('nodegit');
var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var error = require('./error_handler');
/*
 * Clone the username.github.io repository to the server   	
 */
exports.initialize = function(req, res, next){
	var username = req.user.username; // hardcoded value
	UserInfo.findOne({'username' : username},'is_initialized',function(err,userInfo){
		if(err)
			return error.handle(444,'Sorry , Database Error', 'Please try this after some time',next);
		if(!userInfo)
			return error.handle(444,'User does not exists.', '' ,next);
		if(userInfo.is_initialized == true)
			return error.handle(444,'User already initialized.','Give some help message here.', next);

		var path = 'user_files/'+username;
		var remote_url = 'https://github.com/'+ username +'/'+ username +'.github.io.git';
		console.log(remote_url);
		git.Repo.clone(remote_url, path, null, function(err, repo){
			if(err){
				var help_msg = 'Make sure '+ username + '.github.io exits. <a>More help</a>';
				return error.handle(444,'Somthing wrong with your repository', help_msg, next);
			}
			userInfo.is_initialized = true;
			userInfo.save(function(err, user, count){
				if(err)
					return error.handle(445,'Sorry , Database Error', 'Please try this after some time',next);
			});
			res.send("cloned successfully");
			/*UserInfo.findOneAndUpdate({'username' : username},{is_initialized : true},{'new' : false},
				function(err, user){
					if(err)
						return error.handle(444,'Sorry , Database Error', 'Please try this after some time',next);
					res.send("cloned successfully");
			});*/
			
		});
	});	
};


exports.signUp = function(req, res, next){
	var username = req.user.username;
	var full_name = req.user._json.name;
	var email = req.user._json.email;
	UserInfo.findOne({'username' : username}, 'is_initialized',function(err,user){
		if(err)
			return error.handle(445,'Sorry , Database Error', 'Please try this after some time',next);
		if(!user){
			new UserInfo({
				username : username,
				full_name: full_name,
				email : email,
				is_initialized : false

			}).save(function(err, user, count){
				if(err)
					return error.handle(445,'Sorry , Database Error', 'Please try this after some time',next);
			});
			res.redirect('/initialize');
		}
		else if(user.is_initialized == false)
			res.redirect('/initialize');
		else
			res.redirect('/manage-pages');
	});	
};
