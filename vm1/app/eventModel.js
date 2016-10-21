// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Event Schema. This will be the basis of how Event data is stored in the db
var EventSchema = new Schema({
    Eventid: {type: String, required: true},
    name: {type: String, required: true},
    venue_id:{type: String, required: true},
    _creator : { type: Number, ref: 'venues' },   
    url: {type: String, required: true},
    event_date: {type: Date, default: Date.now},     
    
});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('Events', EventSchema);