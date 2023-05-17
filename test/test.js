const {deepStrictEqual} = require('assert');
const {describe, it} = require('node:test');

describe('sample test', function() {
  it('should return true', function() {
    deepStrictEqual(1, 1);
  });
});

