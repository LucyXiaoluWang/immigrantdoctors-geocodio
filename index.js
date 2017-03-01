
const express = require('express');
const port    = process.env.PORT;

// geocod.io API key
const apiKey  = process.env.API_KEY;

var app = express();

/**
 * Post an address
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {}          [description]
 * @return {[type]}      [description]
 */
app.post('/address', function(req, res) {

});

app.listen(, function() {
  console.log('Server running on port ' + port);
});