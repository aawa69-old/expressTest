var express = require('express');
var app = express();

//app.get('/', function(request, response) {
//	response.sendfile(__dirname + '/public/index.html');	//__dirname rtns executing script directory
//});

var logger = require('./logger');  // require and use the logger.js module
app.use(logger);				   // 'app.use' adds the module to the stack 	

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its centre'};

app.use(express.static('public'));  //static middleware serving files from the 'public' folder

// Placeholders can be used to name arguments part of the url path
app.get('/blocks/:name', function(request, response) {   // :name - creates 'name' propert on the request.params object 
	var description = blocks[request.params.name];
	if(!description) {
		request.status(400).json('No description found for ' + request.params.name);
	} else {
		response.json(description); 	
	}
	
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});