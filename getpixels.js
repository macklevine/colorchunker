var getPixels = require('get-pixels');

//NOTES: req.body should have height and width of the image to analyze.
//for now, we'll use global variables:

var height = 5; //250
var width = 5;  //850
var chunkSize = 1; //10


var pixelGetter = function(req, res){
  getPixels('fivebyfive.png', function(err, pixels){
    if (err){
      console.log(err);
      return;
    } 
    chunker(pixels.data, function(_storage){
      console.log(_storage + "is our storage object");
      res.send(_storage);
    });
  });
};

var chunker = function(data, callback){
  var _storage = {};
  var index = 0;
  //image height, image width, and pixel size will be changed according to what we pick for our final spec.
  for (var i = 0; i < height; i+=chunkSize){ //chunkSize: 2
    for (var j = 0; j < width; j+=chunkSize){ //chunkSize: 2
      chunk = chunkMaker(j, i, data);
      _storage[index++] = {
        coords: [j, i], 
        rgb: returnRGB(chunk),
        original: true
      }
    }
  }
  callback(_storage);
};

var chunkMaker = function(xCoord, yCoord, data){
  var chunk = []; //construct a flat array of pixels scanning left to right, top to bottom.
  for (var i = yCoord; i < yCoord+chunkSize; i++){
    for (var j = (xCoord*4); j < ((xCoord*4)+(chunkSize*4)); j++){

      var where = (j + yCoord*width*4);
      console.log(data[where]);
      chunk.push(data[where]);
    }
  }
  return chunk;
};

var returnRGB = function(data){
  return {
    r: data[0],
    g: data[1],
    b: data[2]
  }
}

var getAverageColor = function(data) {
  var r = 0;
  var g = 0;
  var b = 0;

  for (var i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i+1];
    b += data[i+2];
  }

  r = Math.floor(r / (data.length / 4));
  g = Math.floor(g / (data.length / 4));
  b = Math.floor(b / (data.length / 4));

  return { r: r, g: g, b: b };
};

exports.pixelGetter = pixelGetter;