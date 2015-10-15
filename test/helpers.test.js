var expect = require('chai').expect

describe("helpers", function() {

  var helpers = require("../helpers.js")

  describe("overwrite", function() {

    var overwrite = helpers.overwrite
    var empty
    var source

    beforeEach(function() {
      source = { a: 1, b: 2, c: 3 }
      empty = {}
    })

    it("should not add non-existing properties to source object", function() {
      overwrite(empty, source);
      expect(empty).to.deep.equal({})
    })

    it("should not touch any members not mentioned", function() {
      overwrite(source, { c: 0, d: 4 })
      expect(source.a).to.equal(1)
      expect(source.b).to.equal(2)
    })

    it("should copy values of keys existing in both objects into source", function() {
      overwrite(source, { a: 9, b: 8, c: 7 })
      var expected = { a: 9, b: 8, c: 7 }
      expect(source).to.deep.equal(expected)
    })
  })
})
