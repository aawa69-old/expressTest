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

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

app.use(express.static('public')); //static middleware serving files from the 'public' folder

// convert the 'name' parameter & store it to the request attribute 'blockName' 
app.param('name', function(request, response, next) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    request.blockName = block;
    next();
})

// Call the index.html page
app.get('/', function(request, response) {
    response.sendfile(__dirname + 'index.html'); //__dirname rtns executing script directory
});

app.get('/blocks', function(request, response) {
    response.json(Object.keys(blocks)); 		// convert to json
});

// Placeholders can be used to name arguments part of the url path
app.get('/blocks/:name', function(request, response) { // :name - creates 'name' property on the request.params object	
    console.log(blocks);
    console.log("blockName: " + request.blockName);
    var block = blocks[request.blockName];

    if (!block) {
        request.status(400).json('No block found for ' + request.params.name);
    } else {
        response.json(block);
    }
});

app.get('/locations/:name', function(request, response) { // :name - creates 'name' propert on the request.params object	
    var location = locations[request.blockName];

    if (!location) {
        request.status(400).json('No description found for ' + request.params.name);
    } else {
        response.json(location);
    }
});

app.post('/newBlock', parseUrlencoded, function(request, response) { // Routes take multiple arguments, calling them sequentially
    var newBlock = request.body;
    var newName = newBlock.name[0].toUpperCase() + newBlock.name.slice(1).toLowerCase();
    blocks[newName] = newBlock.description;

    console.log(blocks);
    response.status(201).json(newName);
});

// remove entry from blocks object (pass block name as param)
app.delete('/blocks/:name', function(request, response) {    
    delete blocks[request.blockName];                       // from app.param
    response.sendStatus(200);                               // send http 200 without response body
})

// listen on port 3000
app.listen(3000, function() {
    console.log('Listening on port 3000');
});
