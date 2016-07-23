'use strict';

describe('lanceSolidario.version module', function() {
  beforeEach(module('lanceSolidario.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
