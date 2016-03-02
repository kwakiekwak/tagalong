var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rideSchema = new Schema({
  userId: [],
  name: String,
  location: String,
  destination: String,
  time: Date,
  space: Number
})

module.exports = mongoose.model('Ride', rideSchema);
