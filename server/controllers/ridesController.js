// webtokens
var jwt = require('jsonwebtoken') // applying jsonwebtoken to hold our data (authentication)
// creating a secret to create tokens with
var superSecret = 'ilovescotchscotchyscotchscotch';

// require rides model
var Ride = require('../models/rides')



module.exports = {
  show: function(req, res) {
    res.json({message: 'hooray! welcome to our api'});
  },

  create: function(req, res) {
    // creating a new instance of the User model
    var ride = new Ride();
    ride.name = req.body.name;
    ride.location = req.body.location;
    ride.destination = req.body.destination;
    ride.time = req.body.time;
    ride.space = req.body.space;

    ride.save(function(err) {
      if(err) {
        // duplicate entry
        if(err.code == 11000)
          return res.json({ success: false, message: 'A ride exists already'});
        else
          return res.send(err);
      }
        res.json({message: 'Ride created!'});
    })
  },

  showAll: function(req, res) {
    Ride.find(function(err, rides) {
      if(err) res.send(err);
      // return the users
      res.json(rides);
    })
  },

  update: function(req, res) {
    console.log(req.body)
    Ride.findById(req.params.id, function(err, ride) {
      console.log(ride)
      if(err) res.send(err);
      // update the rides info ONLY if its new
      if(req.body.location) ride.location = req.body.location;
      if(req.body.destination) ride.destination = req.body.destination;
      if(req.body.time) ride.time = req.body.time;
      if(req.body.space) ride.space = req.body.space;

      ride.save(function(err) {
        if(err) res.send(err);
        // return a message
        else res.json({message: 'Ride updated'});
      })
    })
  },

  delete: function(req, res) {
    Ride.remove({
      _id: req.params.id
    }, function(err, ride) {
      if(err) return res.send(err);
      res.json({message: 'Successfully deleted'})
    })

  }
}
