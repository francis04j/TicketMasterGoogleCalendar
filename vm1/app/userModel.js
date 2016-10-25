// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new Schema({
    username: {type: String, required: true},    
    calendartoken: {type: String, required: true},
    favvenues: [{ type: Schema.Types.ObjectId, ref: 'venues'}]    
});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "vm-users"
module.exports = mongoose.model('vm-user', UserSchema);