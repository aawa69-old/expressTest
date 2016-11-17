// Node molues follows the CommonJS specification
// module.exports - exports function as  a node module & makes it accessible from other files
module.exports = function(request, response, next) {

// + sign converts date Object to milliseconds elapsed since jan 1 1970
// - this is borrowed from unix standard where express & node hail from 
	var start = +new Date();  
	var stream = process.stdout; // writeable stream - will write the log here

	var url = request.url;
	var method = request.method;

//  response object is an 'EventEmitter' - used to listen for events
//  'finish' is an event called that runs asynchronously
	response.on('finish', function() {
		var duration = +new Date() - start;
		var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';

		stream.write(message);  // write the message out
	});

	next();		// moves request to the next middleware in the stack once done
}