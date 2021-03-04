const assert = require("chai").assert

const fooService = require("../../../../src/routes/foo/service")

describe("foo service", () => {
  describe("getFoo", () => {
    it("Should return foo", async () => {
      const expected = "Foo"
      try {
        const actual = await fooService.getFoo()

        assert.equal(actual, expected)
      } catch (err) {
        assert.fail(`Test should not fail: ${err.message}`)
      }
    })
  })
})
