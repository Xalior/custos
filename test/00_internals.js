"use scrict";

var cache = require('../lib/custos.js');

describe('internals', function () {
    var caches = cache.debug.caches;
	it('should  contain a cache object', function(done) {
        (caches === undefined).should.be.false;
        done();
    });
    it('should 4 items long', function(done) {
        caches.should.have.lengthOf(4);
    })
});
