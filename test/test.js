const {deepStrictEqual} = require('assert');
const {describe, it} = require('node:test');
const {one} = require('../src/source.js');

describe('sample test', function() {
  it('should return true', function() {
    deepStrictEqual(one, 1);
  });
});

