const winston = require("winston")
const appRoot = require("app-root-path")

require("dotenv").config()

// Testing adding comments
const options = {
  file: {
    level: process.env.LOG_LEVEL || "debug",
    filename: `${appRoot}/logs/app.log`,
    timestamp: "MM-DD-YYYY",
    handleExceptions: true,
    json: true,
    maxsize: process.env.LOG_SIZE || 104857600,
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: process.env.LOG_LEVEL || "debug",
    handleExceptions: false,
    json: false,
    colorize: true,
  },
}

const errorStackTracerFormat = winston.format((info) => {
  if (info.meta && info.meta instanceof Error) {
    info.message = `${info.message} ${info.meta.stack}`
  }

  return info
})

// This is the logger instance we will use 
const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
    winston.format.prettyPrint(),
    winston.format.splat(),
    errorStackTracerFormat(),
    winston.format.json()
  ),
  exitOnError: false,
})

module.exports = winstonLogger
