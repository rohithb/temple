/*
 *  Error handling functions
 */

module.exports.handle = function (status, message, help_msg, next){
	var err = new Error(message);
	err.status = status;
	err.help_msg = help_msg;
	next(err);
};