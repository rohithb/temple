
/*
 * GET users listing.
 */

exports.initUser = function(req, res){
  res.render('manage-posts',{ title: 'Manage Posts' });
};