// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var fs          = require('fs');
var nodemailer  = require('nodemailer');

var jwt       = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config    = require('./config'); // get our config file
// get our mongoose models
var User      = require('./app/models/user');
var Offer     = require('./app/models/offer');
var OfferType = require('./app/models/offerType');
var City      = require('./app/models/city');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.Promise = global.Promise;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// use morgan to log requests to the console
app.use(morgan('dev'));

// ######### API ROUTES #########

// get an instance of the router for api routes
var apiRoutes = express.Router();

// ######### PUBLIC API #########

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the AzureCloud-Cytoscape API!' });
});

/*
 * /authenticate
 * nickname:      name of the user [string]
 * password:  password of the user [string]
 */
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    "nickname": req.body.nickname
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    }
    else if(user.blocked){
      res.json({
        success: false,
        message: 'You have to verify your account first.'
      });
    }
    else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      }
      else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

/*
 * /register
 *
 * nickname:  nickname of the user [string]
 * password:  password of the user [string]
 * email:     email of the user [string]
 * phone:     phone of the user [string]
 * date:      birthdate of the user
 * name:      name of the user  [string]
 */
apiRoutes.post('/register', function(req, res, next){
  console.log(req.body.nickname +"  "+req.body.password+"  "+req.body.email);
  if(!req.body.nickname || !req.body.password || !req.body.email)
    res.json({
      success: false,
      message: "You've to fill all the fields."
    });
  else
    next();
},function(req,res, next){
    User.find({email: req.body.email}, function(err, users){
      if(err)
        throw(err);
      if(users[0]){
        return res.json({
          success: false,
          message: "this email is already registered"
        });
      }
      else{
        next();
      }
    });
  },function(req, res, next){
      User.find({nickname: req.body.nickname}, function(err, users) {
        if(err)
          throw(err);
        if(users[0])
          return res.json({
            success: false,
            message: "This nickname already exist."
          });
        else{
          next();
        }
      });
  },function(req, res, next){
    var nick = new User({
      nickname: req.body.nickname,
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      seller: req.body.seller,
      blocked: true
    });

    // save the sample user
    nick.save(function(err) {
      if (err) throw err;
      res.json({
        success: true,
        message: "User registered successfully!"
      })
      console.log('User saved successfully');
    });

    var id = nick._id;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email,
        pass: config.password
      }
    });

    var verify = config.home_path + '/api/verify?token=' +id;
    var mailOptions = {
      from: config.email,
      to: nick.email,
      subject: 'Verify your Discovery Catania account!',
      text: verify
    };

    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        console.log("Invalid Email.");
        res.json({
          success: false,
          message: "Invalid Email."
        })
      }
      else {
        console.log('Message sent: ' +info.response);
        res.json({
          success: true,
          message: "Email di conferma inviata con successo!"
        });
      };
    });
  }
);

/*
 * /verify route to verify an user's email
 *
 * token: user's token [string]
 */
apiRoutes.get('/verify', function(req,res){
  var id_token = req.query.token;
  console.log("XX##########"+id_token);
  User.update({"_id": id_token}, {"$set": {"blocked": false}}, function(err){
    if(err)
      throw(err);
  });

  res.writeHead(301,
    { Location: config.home_path + '/#!/login'},
    "User verified."
  );
  res.end();
});

/*
 * /email_verify route to verify if it already exists an user with this email
 *
 * email: email that needs to be verified [string]
 */
 apiRoutes.get('/email_verify', function(req, res){
   User.find({email: req.query.email}, function(err, users){
    if(err)
      throw(err);
    if(users[0])
      res.json({
        success: false,
        message: "This email is already registered"
      });
    else
      res.json({
        success: true,
        message: "Valid email"
      });
   });
 });

 apiRoutes.get('/nick_verify', function(req, res){
   User.find({nickname: req.query.nickname}, function(err, users){
    if(err)
      throw(err);
    if(users[0])
      res.json({
        success: false,
        message: "This nickname already exists"
      });
    else
      res.json({
        success: true,
        message: "Valid nickname"
      })
   });
 });

// route middleware to verify a token
/*
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});
*/

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('AzureCloud-Cytoscape http://localhost:' + port);
