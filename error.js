//
// Error handler
//
/*
	Custom Error codes

	444 - The response should be a Json Object.
	else - The response should be a error page.

*/

exports.error = function(err, req, res, next){
	console.log(err.stack);
	if(err.status == 444){
		var resJson={};
		if(err.message)
			resJson.message = err.message;
		else
			resJson.message = "Something went wrong. Please try again."
		resJson.status = err.status;
		if(err.help_msg)
			resJson.help_msg = err.help_msg;
		else
			resJson.help_msg = " ";
		res.send(444,resJson);
	}
	else{
		console.log(err.stack);
		resJson.message = err.message;
		resJson.status = err.status;
		resJson.help_msg = err.help_msg;
		res.send(resJson);
	}
	
};