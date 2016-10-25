// Dependencies
var mongoose        = require('mongoose');
var User            = require('./userModel.js');
var Event            = require('./eventModel.js');
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
        var query = Venue.find({}).populate('events');
        query.exec(function(err, venues){
            if(err)
                res.send(err);
            
            res.json(venues);
        });
    });

    app.get('/events', function(req, res){
        var query = Event.find({});
        query.exec(function(err, events){
            if(err)
                res.send(err);
            
            res.json(events);
        });
    });

    app.get('/events/:venueid', function(req, res){

        var query = Event.find({ name: request.params.venueid });
        query.exec(function(err, events){
            if(err)
                res.send(err);
            
            res.json(events);
        });
    });

app.get('/userFavVenues', function(req, res){
        var query = User.find({}).populate('favvenues');
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

    app.post('/addVenueToUsers', function(req, res){
        User.findOne({username: req.body.username},
            function(err,user){
         Venue.findOne({ venueid: req.body.venueid },
                            function(err,venue){
                                if (err) res.send(err);
                                user.favvenues.push(venue);
                                user.save(function(err,evente){                         
                            if(err) res.send(err);            
                            res.json(req.body);
                            });
                        });
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

    app.post('/events', function(req, res){          
       var event1 = new Event(req.body);
       event1.event_date = new Date(req.body.event_date);
        Venue.findOne({venueid: req.body.venue_id},
                    function(err,venue1){
                        if (err) res.send(err);
                        venue1.events.push(event1);
                        venue1.save(function(err,evente){
                            event1.save(function(err){
                            if(err)
                                res.send(err);
            
                            res.json(req.body);
                            });
                        });
                      });  
                        
                    
      //  venue.events.add(event1);
       // venue.save(function(err){});
        
    });

    app.delete('/events', function(req, res){

        var query = Event.remove({ Eventid: req.body.eventid });
        query.exec(function(err, events){
            if(err)
                res.send(err);
            
            res.json(events);
        });
    });

    app.delete('/venues', function(req, res){

        var query = Venue.remove({ venueid: req.body.venueid });
        query.exec(function(err, venues){
            if(err)
                res.send(err);
            
            res.json(venues);
        });
    });
};  