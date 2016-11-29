var express = require('express');
var app = express();

var bodyParser = require('body-parser'); // form data parsing - npm install body-parser
var parseUrlencoded = bodyParser.urlencoded({ extended: false }); // force use of native querystring node library

var logger = require('./logger'); // require and use the logger.js module
app.use(logger); // 'app.use' adds the module to the stack 	

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its centre'
};

app.use(express.static('public')); 				//static middleware serving files from the 'public' folder

//Routes
app.get('/', function(request, response) {
    //response.write('Hello World');
    //response.end();
    response.sendFile(__dirname + 'index.html'); //execute index.html - '__dirname' rtns executing script directory
});

app.get('/blocks', function(request, response) {
    response.json(Object.keys(blocks)); 		// convert to json
});

app.get('/redirect', function(request, response) {
    response.redirect(301, '/blocks'); 			// permanently redirect '/blocks' to '/blocks'
});

app.post('/blocks', parseUrlencoded, function(request, response) { // Routes take multiple arguments, calling them sequentially
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name);
});

app.delete('/blocks/:name', function(request, response) {    
    delete blocks[request.blockName];           // remove entry from blocks object
})

// listen on port 3000
app.listen(3000, function() {
    console.log('Listening on port 3000');
});
