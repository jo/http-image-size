'use strict';

var assert = require('assert');
var size = require('require-main')();

function isSizeDetected(dimensions, length) {
  assert.strictEqual(typeof dimensions, 'object');
  assert.strictEqual(typeof dimensions.width, 'number');
  assert(dimensions.width > 0);
  assert.strictEqual(typeof dimensions.height, 'number');
  assert(dimensions.height > 0);

  assert.strictEqual(typeof length, 'number');
}

describe('http-image-size', function() {
  it('should detect the size of an image via http.', function(done) {
    size('http://nodejs.org/images/logo.png', function(err, dimensions, length) {
      if (err) {
        done(err);
        return;
      }
      isSizeDetected(dimensions, length);
      done();
    });
  });
  it('should detect the size of an image via https.', function(done) {
    size('https://www.npmjs.org/static/img/npm.png', function(err, dimensions, length) {
      if (err) {
        done(err);
        return;
      }
      isSizeDetected(dimensions, length);
      done();
    });
  });
  it('should throw an error when the URL doesn\'t have http(s) scheme.', function() {
    assert.throws(size.bind(null, 'ftp://dummy.com/foo.jpg', function() {}), Error);
  });
  it('should pass an error when the image is not found.', function(done) {
    size('http://jo.github.io/http-image-size/dummy.gif', function(err) {
      assert.throws(assert.ifError.bind(null, err));
      done();
    });
  });
  it('should pass an type error when the URL is not an image URL.', function(done) {
    size('http://example.com/', function(err) {
      assert.throws(assert.ifError.bind(null, err), TypeError);
      done();
    });
  });
});
