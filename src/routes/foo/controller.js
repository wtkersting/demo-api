const express = require("express")
const router = express.Router()

const winston = require("../../../config/winston")

const fooService = require("./service")

// Import and use all subroutes
const barController = require("./bar/controller")

router.use("/bar", barController)

/**
 * Base route gets and returns foo
 */
router.get("/", async (req, res) => {
  winston.info("Getting Foo")
  try {
    const foo = await fooService.getFoo()

    res.send({ foo }).status(200)
  } catch (err) {
    winston.error(`Error getting foo: ${err.stack}`)
    res.sendStatus(500)
  }
})

module.exports = router
