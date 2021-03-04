require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = process.env.PORT || 3000

const winston = require("./config/winston")

// Import all base controllers
const fooController = require("./src/routes/foo/controller")

// Optional limit size of request body
app.use(bodyParser.json({ limit: "1mb" }))

// Use all defined controllers here
app.use("/foo", fooController)

// 404 handler
app.use("*", (req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  winston.info(`Example app listening at http://localhost:${port}`)
})
