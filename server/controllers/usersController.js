// webtokens
var jwt = require('jsonwebtoken') // applying jsonwebtoken to hold our data (authentication)
// creating a secret to create tokens with
var superSecret = 'ilovescotchscotchyscotchscotch';

// require User model
var User = require('../models/users');



module.exports = {
  show: function(req, res) {
    res.json({message: 'hooray! welcome to our api'});
  },

  create: function(req, res) {
    // creating a new instance of the User model
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err) {
      if(err) {
        // duplicate entry
        if(err.code == 11000)
          return res.json({ success: false, message: 'A user with that \
            username already exists.'});
        else
          return res.send(err);
      }
        res.json({message: 'User created!'});
    })
  },

  showAll: function(req, res) {
    User.find(function(err, users) {
      if(err) res.send(err);
      // return the users
      res.json(users);
    })
  },

  update: function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) res.send(err);
      // update the users info ONLY if its new
      if(req.body.name) user.name = req.body.name;
      if(req.body.email) user.email = req.body.email;
      if(req.body.username) user.username = req.body.username;
      if(req.body.password) user.password = req.body.password;

      user.save(function(err) {
        if(err) res.send(err);
        // return a message
        res.json({message: 'User updated'});
      })
    })
  },

  delete: function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if(err) return res.send(err);
      res.json({message: 'Successfully deleted'})
    })

  },

  authenticate: function(req, res) {
    // find the user
    // select the name username and password explicitly
    User.findOne({
      username: req.body.username
    }).select('_id name email username password').exec(function(err, user) {
      console.log(user)
      if(err) throw err;
      // no user with taht username was found
      if(!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        // check if password matches
        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          // if user is found and password is right
          // create a TOKEN
          var token = jwt.sign({
            _id: user.id,
            name: user.name,
            username: user.username
          }, superSecret, { expiresMinutes: 1440 // expires in 24 hourss
         });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    })
  }
}
