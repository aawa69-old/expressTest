var express = require('express');
var router = express.Router();		// return router instance which can be mounted as middeware 

var bodyParser = require('body-parser'); // form data parsing - npm install body-parser
var parseUrlencoded = bodyParser.urlencoded({extended: false}); // force use of native querystring node library

var blocks = {
    'Fixed': 'Fastened securely in position', 
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its centre' 
};

// returns route object which handles all requests to the /blocks path
router.route('/')
	.get(function(request, response) {
    	response.json(Object.keys(blocks)); 		// convert to json
	});

// Placeholders can be used to name arguments part of the url path
router.route('/:name')							// specify root path relative to where it's mounted, i.e. /blocks/..
	.all(function(request, response, next) {	// 'all' is an alternative to app.parm in dynamic.js (match all http verbs)
	    var name = request.params.name;
	    request.blockName = name[0].toUpperCase() + name.slice(1).toLowerCase();
	    next();
	})
	// Chain GET and DELETE functions
    .get(function(request, response) { // :name - creates 'name' property on the request.params object	
        console.log(blocks);
        console.log("blockName: " + request.blockName);
        var block = blocks[request.blockName];

        if (!block) {
            request.status(400).json('No block found for ' + request.params.name);
        } else {
            response.json(block);
        }
    })
    .delete(function(request, response) {
        // remove entry from blocks object (pass block name as param)
        delete blocks[request.blockName];   // set in app.param
        response.sendStatus(200);           // send http 200 without response body
    })
    .post(parseUrlencoded, function(request, response) { // Routes take multiple arguments, calling them sequentially
    	var newBlock = request.body;
    	var newName = newBlock.name[0].toUpperCase() + newBlock.name.slice(1).toLowerCase();
    	blocks[newName] = newBlock.description;

    	console.log(blocks);
    	response.status(201).json(newName);
	});

module.exports = router;		// assign router to module.exports to make it accessible from other files var bodyParser = require('body-parser'); // form data parsing - npm install body-parser