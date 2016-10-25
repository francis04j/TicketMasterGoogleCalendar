// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Venue Schema. This will be the basis of how venue data is stored in the db
var VenueSchema = new Schema({
    venueid: {type: String, required: true},
    name: {type: String, required: true},
    postalcode: {type: String, required: true},
    url: {type: String, required: true},
    countrycode: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    latitude:{type: [Number], required: true},
    longitude:{type: [Number], required: true},    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    events : [{ type: Schema.Types.ObjectId, ref: 'Events'}]
});

// Sets the created_at parameter equal to the current time
VenueSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
VenueSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('venues', VenueSchema);