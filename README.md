# http-image-size
Detect image dimensions via http.  
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
