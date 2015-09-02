var express = require('express');
var db = require('./db.js');

var bodyparser = require('body-parser');
var path = require('path');

var app = express();

app.use(express.static('./client'));
app.use(bodyparser.json());

app.listen(3000, function(){
  console.log("listening on port 3000");
});

app.post('/newevent', function(req, res){
  console.log(req.body + " is our data");
  db.saveEvent(req, res);
});


app.get('/', function (req, res) {
  res.sendfile('./client/index.html');
});