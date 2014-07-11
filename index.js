/**
 * http-image-size: Detect image dimensions via http.
 *
 * Licensed under the MIT license.
 * https://github.com/jo/http-image-size
 * © 2014 Johannes J. Schmidt
 *
 */

'use strict';

var url = require('url');
var http = require('http');
var https = require('https');
var sizeOf = require('image-size');

module.exports = function(imgUrl, done) {
  var options = url.parse(imgUrl);
  var client;
  if (options.protocol === 'https:') {
    client = https;
  } else if (options.protocol === 'http:') {
    client = http;
  } else {
    throw new Error('The string should have "http" or "https" scheme.');
  }

  var req = client.get(options, function(response) {
    var buffer = new Buffer([]);
    var dimensions;
    var imageTypeDetectionError;

    response
    .on('data', function(chunk) {
      buffer = Buffer.concat([buffer, chunk]);
      try {
        dimensions = sizeOf(buffer);
      } catch (e) {
        imageTypeDetectionError = e;
        return;
      }
      req.abort();
    })
    .on('error', function(err) {
      done(err);
    })
    .on('end', function() {
      if (!dimensions) {
        done(imageTypeDetectionError);
        return;
      }
      done(null, dimensions, buffer.length);
    });
  });
};
