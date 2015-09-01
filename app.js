var express = require('express');
var pixelGetter = require('./getpixels.js');

var bodyparser = require('body-parser');
var path = require('path');

var app = express();

app.listen(3000, function(){
  console.log("listening on port 3000");
});

app.get('/getpixels', function(req, res){
  pixelGetter.pixelGetter(req, res);
});

//set up a route for getting the image data.