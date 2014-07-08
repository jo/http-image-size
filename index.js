/**
 * http-image-size: Detect image dimensions via http.
 *
 * Licensed under the MIT license.
 * https://github.com/jo/http-image-size
 * © 2014 Johannes J. Schmidt
 *
 */

var url = require('url');
var http = require('http');
var https = require('https');
var sizeOf = require('image-size');

module.exports = function(imgUrl, done) {
  var options = url.parse(imgUrl);
  var client;
  if (options.protocol === 'https:') {
    client = https;
  } else {
    client = http;
  }

  var req = client.get(options, function(response) {
    var buffer = new Buffer([]);

    response.on('data', function(chunk) {
      buffer = Buffer.concat([buffer, chunk]);
      
      try {
        var dimensions = sizeOf(buffer);
        req.abort();
        done(null, dimensions, buffer.length);
      } catch(e) {}
    });
  });
};
