const assert = require("chai").assert

const utilUtils = require("../../../../src/utils/util")

describe("util Util", () => {
  describe("add", () => {
    it("Should return the sum of the two numbers provided", async () => {
      const n1 = 1
      const n2 = 2

      const expected = n1 + n2

      try {
        const actual = utilUtils.add(n1, n2)

        assert.equal(actual, expected)
      } catch (err) {
        assert.fail(`Test should not fail: ${err.message}`)
      }
    })
  })
})
