# http-image-size

[![NPM version](https://badge.fury.io/js/http-image-size.svg)](http://badge.fury.io/js/http-image-size)
[![Build Status](https://travis-ci.org/jo/http-image-size.svg?branch=master)](https://travis-ci.org/jo/http-image-size)
[![Dependency Status](https://david-dm.org/jo/http-image-size.svg)](https://david-dm.org/jo/http-image-size)
[![devDependency Status](https://david-dm.org/jo/http-image-size/dev-status.svg)](https://david-dm.org/jo/http-image-size#info=devDependencies)

Detect image dimensions via http or https.  
It does so by trying to extract image size via
[image-size](https://github.com/netroy/image-size) on each chunk received. When
the dimensions are present, the request is aborted.

## Usage
```js
var size = require('http-image-size');

size('http://die-tf.de/fuck-yeah/fuck-yeah.jpg', function(err, dimensions, length) {
  console.log(err, dimensions, length);
});
```

The callback receives three arguments: `err`, `dimensions`, `length`:

`dimensions` is in the form `{ height: 1063, width: 1600 }`.  
`length` is the number of bytes loaded.

## License
Copyright (c) 2014 Johannes J. Schmidt  
Licensed under the MIT license.
