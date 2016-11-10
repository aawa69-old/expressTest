var express = require('express');
var app = express();

//app.get('/', function(request, response) {
//	response.sendfile(__dirname + '/public/index.html');	//__dirname rtns executing script directory
//});

app.use(express.static('public'));  //static middleware serving files from public folder

app.get('/blocks', function(request, response) {
	var blocks = ['Fixed','Movable','Rotating'];
	response.json(blocks);	// convert to json
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});