
/*
 * Routes related with managing repos.
 */
var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var error = require('./error_handler');

exports.managePages = function(req, res){
	var username = req.user.username;
	UserInfo.findOne({'username' : username}, 'pages', function(err,user){
		if(err)
			return error.handle(444,'Could not save the page.','Some database error.', next);
		var pages = user.pages;
		var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		res.render('manage-posts',{ title: 'Manage Pages', page_title : 'Pages', pages : pages, month : monthName});

	});
	
};

exports.pageSaveOrUpdate = function(req, res, next){
	// TO-DO :: add client side code to verify the status of the opeation. and display appropriate messages.
	var id = req.body.id;
	var title = req.body.title;
	var content = req.body.content;
	var username = req.user.username;
	var date = new Date();
	if(id == 'new'){
	//Create a new Page	
		UserInfo.findOne({'username' : username },function(err, user){
			user.pages.push({
				title : title,
				content : content,
				published : false,
				date : date
			});
			user.save(function(err){
				if(err)
					return error.handle(444,'Could not save the page.','Some database error.', next);
				var last_item = user.pages.pop();
				id = last_item._id;
				res.send({status : "saved", id : id});
			});
		});
	}
	else{
		// Update the existing page
		UserInfo.findOne({'username' : username}, 'pages', function(err, user){
			if(err)
				return error.handle(444,'Could not save the page.','Some database error.', next);
			var page = user.pages.id(id);
			page.title = title;
			page.content = content;
			page.date = date;
			user.save(function(err){
				if(err)
					return error.handle(444,'Could not save the page.','Some database error.', next);
				res.send({status : "saved", id : id});
			});
		});
	}
	
};

exports.pageLoad = function(req, res, next){
	var username = req.user.username;
	var id = req.params.id;
	UserInfo.findOne({'username' : username, 'pages._id' : id}, {'pages.$' : 1},function(err, user){
		if(err)
			return error.handle(444,'Could not save the page.','Some database error.', next);
		res.send(user.pages[0]);
	});
};