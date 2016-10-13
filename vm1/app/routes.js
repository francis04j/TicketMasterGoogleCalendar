// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');
var Venue            = require('./VenueModel.js');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    app.get('/venues', function(req, res){

        var query = Venue.find({});
        query.exec(function(err, venues){
            if(err)
                res.send(err);
            
            res.json(venues);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    app.post('/venues', function(req, res){
        var lat = req.body.latitude;
        var long = req.body.longitude;
        var venue = new Venue(req.body);
        venue.save(function(err){
            if(err)
                res.send(err);
            
            res.json(req.body);
        });
    });
};  