require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJWT = require('express-jwt');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');

// App instance
const app = express();


// Set up middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

// Helper function: this allows our server to parse the incoming token from the client
// This is being run as a middleware function, so it has access to the incoming request
function fromRequest(req){
  if(req.body.headers.Authorization &&
    req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
    return req.body.headers.Authorization.split(' ')[1];
  }
  return null;
}


// Controllers
// All auth routes are protected except for POST to /auth/login and /auth/signup
// Remember to pass the JWT_SECRET otherwise this won't work
// NOTE: The .unless portion is onlly needed if you need exceptions 
app.use('/auth', expressJWT({
  secret: process.env.JWT_SECRET,
  getToken: fromRequest
}).unless({
  path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./controllers/auth'));

// Wildcard catch route,  hopefully no one gets here unless we made a mistake on front-end
app.get('*', function(req, res, next) {
	res.send({ message: 'Unknown Route', error: 404 });
});

// Listen on specified port or default to 3000
app.listen(process.env.PORT || 3000);
