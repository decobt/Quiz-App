var express = require('express');

var app = express();

//define where are public files (css,js,images) and favicon
app.use("/public", express.static('public'));

//connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://quiz:123456@ds127506.mlab.com:27506/quizappdb', {useMongoClient: true});
var db = mongoose.connection;
db.once('open', function() {
  console.log("we're connected to db!");
});

//get api routes from file
var apiRoutes = require('./routes/apiRoutes');
app.use('/api/', apiRoutes);

//define which ip and port the server should listen for requests
var port = process.env.PORT || 8080;

var listener = app.listen(port, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
