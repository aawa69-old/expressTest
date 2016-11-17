var express = require('express');
var app = express();

var logger = require('./logger');  // require and use the logger.js module
app.use(logger);				   // 'app.use' adds the module to the stack 	

app.use(express.static('public'));  //static middleware serving files from the 'public' folder

//Routes
app.get('/', function(request, response) {
	//response.write('Hello World');
	//response.end();
	response.sendFile(__dirname + 'index.html');	//execute index.html - '__dirname' rtns executing script directory
});

app.get('/blocks', function(request, response) {
	var blocks = ['Fixed','Movable','Rotating'];
	response.json(blocks);	// convert to json
});

app.get('/redirect', function(request, response) {
	response.redirect(301,'/blocks');	// permanently redirect '/blocks' to '/blocks'
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});