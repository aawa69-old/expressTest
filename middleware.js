var express = require('express');
var app = express();

//app.get('/', function(request, response) {
//	response.sendfile(__dirname + '/public/index.html');	//__dirname rtns executing script directory
//});

var logger = require('./logger');  // require and use the logger.js module
app.use(logger);				   // 'app.use' adds the module to the stack 	

app.use(express.static('public'));  //static middleware serving files from the 'public' folder

app.get('/blocks', function(request, response) {   // 
	var blocks = ['Fixed','Movable','Rotating'];

	if(request.query.limit >= 0) {  // true when url query param 'limit' > 0
		response.json(blocks.slice(0,request.query.limit));  // rtn the number of values requested in 'limit'
	} else {
		response.json(blocks);	// rtn all values & convert to json
	}

});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});