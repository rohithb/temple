
/*
 * Routes related with managing repos.
 */
var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var error = require('./error_handler');

exports.managePages = function(req, res){
  res.render('manage-posts',{ title: 'Manage Pages', page_title : 'Pages'});
};

exports.createPage = function(req, res, next){
	
};