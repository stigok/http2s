var expect = require('chai').expect
var helpers = require('../helpers.js')

describe('helpers', function() {

  describe('overwrite', function() {

    var overwrite = helpers.overwrite
    var empty
    var source

    beforeEach(function() {
      source = { a: 1, b: 2, c: 3 }
      empty = {}
    })

    it('should not add non-existing properties to source object', function() {
      overwrite(empty, source);
      expect(empty).to.deep.equal({})
    })

    it('should not touch any members not mentioned', function() {
      overwrite(source, { c: 0, d: 4 })
      expect(source.a).to.equal(1)
      expect(source.b).to.equal(2)
    })

    it('should copy values of keys existing in both objects into source', function() {
      overwrite(source, { a: 9, b: 8, c: 7 })
      var expected = { a: 9, b: 8, c: 7 }
      expect(source).to.deep.equal(expected)
    })
  })

  describe('prependArguments', function () {

    it('should return an array', function (done) {
      (function () {
        var args = helpers.prependArguments('a', arguments);
        expect(args.slice(0)).to.not.throw;
        done();
      })('b', 'c');
    })

    it('should prepend a single value', function (done) {
      (function () {
        var args = helpers.prependArguments('a', arguments);
        expect(args.length).to.equal(3);
        expect(args[0]).to.equal('a');
        done();
      })('b', 'c');
    })

    it('should prepend multiple arguments', function (done) {
      (function () {
        var prepends = [1, 2, 3];
        var args = helpers.prependArguments(prepends, arguments);

        expect(args.length).to.equal(5);
        expect(args.slice(0, 3)).to.deep.equal(prepends);

        prepends.push(4);
        prepends.push(5);
        expect(args).to.deep.equal(prepends);

        done();
      })(4, 5);
    })

  })
})
