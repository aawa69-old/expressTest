var express = require('express');
var router = express.Router();		// return router instance which can be mounted as middeware 

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

// returns route object which handles all requests to the /blocks path
router.route('/')
	.get(function(request, response) {
    	response.json(Object.keys(locations)); 		// convert to json
	});

// Placeholders can be used to name arguments part of the url path
router.route('/:name')							// specify root path relative to where it's mounted, i.e. /blocks/..
    .all(function(request, response, next) {    // 'all' is an alternative to app.parm in dynamic.js (match all http verbs)
        var name = request.params.name;
        request.locationName = name[0].toUpperCase() + name.slice(1).toLowerCase();;
        next();
    })
	// Chain GET and DELETE functions
     .get(function(request, response) {      // :name - creates 'name' propert on the request.params object 
        var location = locations[request.locationName];

        if (!location) {
            request.status(400).json('No description found for ' + request.params.name);
        } else {
            response.json(location);
        }
    });

module.exports = router;		// assign router to module.exports to make it accessible from other files