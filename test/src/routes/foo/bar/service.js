const assert = require("chai").assert

const barService = require("../../../../../src/routes/foo/bar/service")

describe("bar service", () => {
  describe("getBar", () => {
    it("Should return bar", async () => {
      const expected = "Bar"
      try {
        const actual = await barService.getBar()

        assert.equal(actual, expected)
      } catch (err) {
        assert.fail(`Test should not fail: ${err.message}`)
      }
    })
  })
})
