var mongoose = require('mongoose'),
    express  = require('express'),
    router   = new express.Router()


// Do I need webtokens in the routes.js???
// webtokens
var jwt = require('jsonwebtoken') // applying jsonwebtoken to hold our data (authentication)
// creating a secret to create tokens with
var superSecret = 'ilovescotchscotchyscotchscotch';


// sockets enable real-time event-based communications
// we communicate to the server FROM the client and in return the server can talk back to the client
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// require controllers
var userController = require('../controllers/usersController');
var rideController = require('../controllers/ridesController');

//body-parser
var bodyParser   = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware to use for all requests
// route middleware to verify a token
router.use(function(req, res, next) {
  // do logging
  console.log("Somebody just came to our app!");
  // this is where we'll add more to the middleware to Chapter 10
  // this is where we will authenticate users

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if(token) {
    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {
      if(err) {
        console.log(token)
        console.log(err)
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is gucci, save to request for use in other routes
        req.decoded = decoded;
        // console.log("gucci")
        next();
        // console.log("hello")
      }
    })
  } else {
    // if there is no token
    // return an HTTP response of 403(access forbidden) and an error message
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
  // next(); // makes sure we go to the next routes and don't stop here
})

router.get('/me', function(req, res) {
  console.log('me')
  res.send(req.decoded)
})
// User API routes
// router.get('/', homeController.index)
router.route('/')
  .get(userController.show)
router.route('/users')
  .get(userController.showAll)
  .post(userController.create)
router.route('/users/:user_id')
  .put(userController.update)
  .delete(userController.delete)
router.route('/authenticate')
  .post(userController.authenticate)


router.route('/')
  .get(rideController.show)
router.route('/rides')
  .get(rideController.showAll)
  .post(rideController.create)
router.route('/rides/:id')
  .put(rideController.update)
  .delete(rideController.delete)
// router.route('/authenticate')
//   .post(rideController.authenticate)

module.exports = router;
