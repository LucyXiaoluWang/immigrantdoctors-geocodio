
/**
 * Wrapper around geocod.io API
 *
 * Exposes a single function that takes an address and
 * returns the congressional district info for that address
 */

const https = require('https');
// geocod.io API key
const apiKey  = process.env.API_KEY;
const baseUrl = "https://api.geocod.io/v1/geocode";

"https://api.geocod.io/v1/geocode?q=1109+N+Highland+St%2c+Arlington+VA&fields=cd,stateleg&api_key=YOUR_API_KEY"


/**
 * Builds a geocodio url from an address String
 * @param  {String} address the address to find the congressional district for
 * @return {String}         url
 */
var buildUrl = function(address) {
  var url = baseUrl + "?q=" + encodeURIComponent(address);
  url = url + '&fields=cd&api_key=' + encodeURIComponent(apiKey);
  return url;
}


/**
 * Given an address, find congressional district
 * @param  {String}   address  the address to find the congressional district for
 * @param  {Function} callback error-first node-style callback function
 */
var geocodio = function(address, callback) {
  if (typeof address !== 'string') {
    throw new Error('geocodio needs address as string!');
  }

  var url = buildUrl(address);

  var apiResponse = '';

  https.get(url, function(res) {

    res.on('data', function(data) {
      apiResponse += data;
    });

    res.on('error', function(error) {
      callback(error);
    });

    res.on('end', function() {
      var response = JSON.parse(apiResponse);
      if (apiResponse.error) {
        console.log(apiResponse);
        callback(apiResponse.error);
      } else if (response.results) {
        console.log(response);
        var result = response.results[0];
        var addressWithCd = {
          congressional_district: result.fields.congressional_district,
          address_components: result.address_components,
          formatted_address: result.formatted_address
        };
        callback(null, addressWithCd);
      } else {
        console.log(apiResponse);
        callback("Something went wrong in the geocodio lookup.");
      }
      
    })

  });

}


module.exports = geocodio;