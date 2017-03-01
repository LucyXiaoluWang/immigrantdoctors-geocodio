
const express    = require('express');
const port       = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const geocodio   = require('./geocodio');

var app = express();


// MIDDLEWARE

// parse application/json
app.use(bodyParser.json())



// APPLICATION

/**
 * GET an address -- /address
 */
app.get('/address', function(req, res) {
  // Get address from request params
  var address = req.query.q;
  console.log('address');
  // Call geocode.io
  geocodio(address, function(err, district) {
    if (err) {
      console.log(err);
      res.status(500).json({error: "Something went wrong."});
      return;
    }
    res.status(200).json(district);
  })
});


// SERVER

app.listen(port, function() {
  console.log('Server running on port ' + port);
});