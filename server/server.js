////////////////////// BASE SETUP ////////////////////////////

var express     = require('express'), // call express
    app         = express(), // define out app using express
    mongoose    = require('mongoose'), // for working w/ our database
    morgan      = require('morgan'), // used to see requests
    path        = require('path'),
    cors        = require('cors'),
    bodyParser  = require('body-parser'), // get body-parser
    routes      = require('./config/routes'),
    jwt         = require('jsonwebtoken') // applying jsonwebtoken to hold our data (authentication)
app.use(cors());
// creating a secret to create tokens with
var superSecret = 'ilovescotchscotchyscotchscotch';

// require User model
var User = require('./models/users');

// APP CONFIGURATION
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configuring our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
})

// log all requests to the console
app.use(morgan('dev'));

// Routes For Our API
// ========================

// basic route for the home page
// will change it up
app.get('/', function(req, res) {
  res.send('Welcome to the home page!');
})

// Get an instance of the express router
// var apiRouter = express.Router();



// REGISTER OUR ROUTES _________________________
// all of our routes will be prefixed with /api
app.use('/api', routes);


// Setting up local database
mongoose.connect('mongodb://localhost:27017/tag-along');

app.listen(3000, function() {
  console.log("Listening on ...")
})


