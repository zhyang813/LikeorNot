var express = require('express');
var mongoose = require('mongoose');
var questionController = require('./questionController.js')
var morgan = require('morgan');
var bodyParser = require('body-parser');


var app = express();


//Mongodb set-up
mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/survey';
mongoose.connect(mongoURI);

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));



//Router
app.post('/api/q', questionController.newQ);
app.get('/api/q', questionController.all);

app.post('/api/thumbup', questionController.thumbUp);
app.post('/api/thumbdown', questionController.thumbDown);




module.exports = app;
