const winston = require('winston')
const config = require('./config')

const winstonLogger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: winston.format.combine(winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
    }),
  ],
});


// see https://www.dobrica.sh/notes/Logging
const RETENTION_TYPES = {
  TRANSACTION: 'TRANSACTION',
  REQUEST: 'REQUEST',
  APPLICATION: 'APPLICATION',
  TMP: 'TMP'
}


const errorReplacer = (metadata) => {
    if (metadata instanceof Error) {
      return { message: metadata.message, stack: metadata.stack };
    }
    return metadata
}

class Logger {
  constructor(loggerInstance, retentionType) {
    this.logger = loggerInstance
    this.retention = retentionType
  }

  debug = (message, metadata = {}) => {
    const log = {
      message,
      retention: this.retention,
      metadata
    }
    this.logger.debug(log)
  }

  info = (message, metadata = {}) => {
    metadata = errorReplacer(metadata)
    const log = {
      message,
      retention: this.retention,
      metadata
    }
    this.logger.info(log)
  }

  warn = (message, metadata = {}) => {
    metadata = errorReplacer(metadata)
    const log = {
      message,
      retention: this.retention,
      metadata
    }
    this.logger.warn(log)
  }

  error = (message, metadata = {}) => { 
    metadata = errorReplacer(metadata)
    const log = {
      message,
      retention: this.retention,
      metadata
    }
    this.logger.error(log)
  }

}



module.exports = {
  Logger: Logger,
  transaction: new Logger(winstonLogger, RETENTION_TYPES.TRANSACTION),
  request: new Logger(winstonLogger, RETENTION_TYPES.REQUEST),
  application: new Logger(winstonLogger, RETENTION_TYPES.APPLICATION),
  tmp: new Logger(winstonLogger, RETENTION_TYPES.TMP)
}
