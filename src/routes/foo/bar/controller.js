const express = require("express")
const router = express.Router()

const winston = require("../../../../config/winston")

const barService = require("./service")

/**
 * Base route gets and returns bar
 */
router.get("/", async (req, res) => {
  winston.info("Getting Bar")
  try {
    const bar = await barService.getBar()

    res.send({ bar }).status(200)
  } catch (err) {
    winston.error(`Error getting bar: ${err.stack}`)
    res.sendStatus(500)
  }
})

module.exports = router
