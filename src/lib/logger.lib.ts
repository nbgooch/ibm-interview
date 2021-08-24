import winston, { format } from 'winston';

export default winston.createLogger({
  format: format.combine(
    format.timestamp(),
    format.prettyPrint({ depth: 3, colorize: true }),
    format.json(),
    format.cli(),
  ),
  transports: new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
  }),
  exitOnError: false,
});
