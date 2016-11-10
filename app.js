var express = require('express');
var app = express();

app.get('/', function(request, response) {
	response.write('Hello World');
	response.end();
});

app.get('/blocks', function(request, response) {
	var blocks = ['Fixed','Movable','Rotating'];
	response.json(blocks);	// convert to json
});

app.get('/blocks', function(request, response) {
	response.redirect(301,'/parts');	// permanently redirect /blocks to /parts
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});