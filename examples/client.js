#!/usr/bin/env node
/**
 * http-image-size: Detect image dimensions via http.
 *
 * example command line client
 *
 * Licensed under the MIT license.
 * https://github.com/jo/http-image-size
 * © 2014 Johannes J. Schmidt
 *
 */

var size = require('..');
var url = process.argv[2];

console.log('Extracting image dimension from ' + url);
size(url, function(err, dimensions, length) {
  if (err) {
    return console.log(err);
  }

  console.log(dimensions, length);
});
