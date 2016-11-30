var express = require('express');
var app = express(); 

var logger = require('./logger');   // require and use the logger.js module
app.use(logger);                    // 'app.use' adds the module to the stack 

app.use(express.static('public'));  //static middleware serving files from the 'public' folder

var blocks = require('./routes/blocks');
var locations = require('./routes/locations');

app.use('/blocks', blocks);         // all requests to '/blocks' url are dispatched to the blocks router
app.use('/locations', locations);   // all requests to '/locations' url are dispatched to the locations router

// convert the 'name' parameter & store it to the request attribute 'blockName' 
// Moved to .all function (alternative to app.param) in the block.js file - leaving here for example
//app.param('name', function(request, response, next) {
//    var name = request.params.name;
//    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
//
//    request.blockName = block;
//    next();
//})

// Call the index.html page
app.get('/', function(request, response) {
    response.sendfile(__dirname + 'index.html'); //__dirname rtns executing script directory
});

// listen on port 3000
app.listen(3000, function() {
    console.log('Listening on port 3000');
});
