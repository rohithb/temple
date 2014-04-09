var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var error = require('./error_handler');
var fs = require('fs');

exports.general = {
	'get' : function(req, res, next){
		res.render('settings_general',{'title' : 'General Settings', 'page_title' : 'General Settings'});
	},
	'post' : function(req, res, next){
		var username = req.user.username;
		var data = req.body;
		var fullName = data.firstName + ' ' + data.lastName;
		UserInfo.update({'username' : username},{$set:{
			'full_name' : fullName, 
			'settings.site_title' : data.siteTitle,
			'settings.tag_line'	: data.tagLine
		}}, function(err){
			if(err)
				return error.handle(444,'Could not save the page.','Some database error.', next);
			res.send({status : 'saved'});
		});
		
	}
};

exports.layout ={
	'get' : function(req, res, next){
		var username = req.user.username;
		UserInfo.findOne({'username' : username}, 'theme', function(err, user){
			var theme_path = 'user_files/'+ username +'/themes/'+user.theme;
			fs.readFile(theme_path + '/layout_user.jade', function(err, data){
				if(err)
					return error.handle(500,'Cannot read the layout file','',next);
				res.render('settings_layout',{
					'title' : 'Layout Settings', 
					'page_title' : 'Layout Settings',
					'page_layout' : data
				});
			});
		});
	},
	'post' : function(req, res, next){
		var username = req.user.username;
		var config = req.body.config;
		UserInfo.findOne({'username' : username}, 'theme', function(err,user){
			var theme_path = 'user_files/'+ username +'/themes/'+user.theme;
			fs.writeFile(theme_path +'/layout_user.jade', config, function(err){
				if(err)
					return error.handle(444,'Could not save the layout file.', '',next());
				res.send({status : 'saved'});
			});
		});
		
	}
};