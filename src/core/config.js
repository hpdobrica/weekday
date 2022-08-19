const envalid = require('envalid')
const { str } = envalid;

module.exports = envalid.cleanEnv(
  process.env,
  {
    LOG_LEVEL: str({
      choices: ['error', 'warn', 'info', 'debug'],
      default: 'info',
      desc: 'Log level',
    }),
  }
);
