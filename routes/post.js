
/*
 * Routes related with managing repos.
 */
var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var error = require('./error_handler');

exports.manage = function(req, res){
	var username = req.user.username;
	UserInfo.findOne({'username' : username}, 'posts', function(err,user){
		if(err)
			return error.handle(444,'Could not save the post.','Some database error.', next);
		var posts = user.posts;
		var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		res.render('manage-posts',{ title: 'Manage Posts', page_title : 'Posts', posts : posts, month : monthName});

	});
	
};

exports.saveOrUpdate = function(req, res, next){
	// TO-DO :: add client side code to verify the status of the opeation. and display appropriate messages.
	var id = req.body.id;
	var title = req.body.title;
	var content = req.body.content;
	var username = req.user.username;
	var date = new Date();
	if(id == 'new'){
	//Create a new Post	
		UserInfo.findOne({'username' : username },function(err, user){
			user.posts.push({
				title : title,
				content : content,
				published : false,
				date : date
			});
			user.save(function(err){
				if(err)
					return error.handle(444,'Could not save the post.','Some database error.', next);
				var last_item = user.posts.pop();
				id = last_item._id;
				res.send({status : "saved", id : id});
			});
		});
	}
	else{
		// Update the existing post
		UserInfo.findOne({'username' : username}, 'posts', function(err, user){
			if(err)
				return error.handle(444,'Could not save the post.','Some database error.', next);
			var post = user.posts.id(id);
			post.title = title;
			post.content = content;
			post.date = date;
			user.save(function(err){
				if(err)
					return error.handle(444,'Could not save the post.','Some database error.', next);
				res.send({status : "saved", id : id});
			});
		});
	}
	
};

exports.load = function(req, res, next){
	var username = req.user.username;
	var id = req.params.id;
	UserInfo.findOne({'username' : username, 'posts._id' : id}, {'posts.$' : 1},function(err, user){
		if(err)
			return error.handle(444,'Could not save the post.','Some database error.', next);
		res.send(user.posts[0]);
	});
};

exports.publish = function(req, res, next){
	var username = req.user.username;
	var id = req.params.id;
	var action = req.params.publish;   // action = publish or unpublish
	if(action =='publish')
		action = true;
	else if(action == 'unpublish')
		action = false;
	UserInfo.update({'username' : username, 'posts._id' : id}, {$set:{'posts.$.published' : action}},
	 function(err){
			if(err)
				return error.handle(444,'Could not save the post.','Some database error.', next);
			res.send({'status' : true});
		});
	
};

exports.saveAttr = function(req, res, next){
	var username = req.user.username;
	var id = req.query.id;
	var parent = req.query.parent_id;
	var order = req.query.order;
	UserInfo.update({'username' : username, 'posts._id' : id},{
		$set:{
			'posts.$.parent' : parent,
			'posts.$.order' : order
		}},function(err){
			if(err)
				return error.handle(444,'Could not save the post.','Some database error.', next);
			res.send({'status' : true});
		});
	
};