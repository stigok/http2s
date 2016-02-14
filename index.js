'use strict';

const connect = require('connect');
const http = require('http');
const util = require('util');
const helpers = require('./helpers.js');
const logger = require('./logger.js');
const app = connect();

// Default settings
const settings = {
  // http port to listen to
  http: 80,
  // https port to redirect to
  https: 443,
  // server hostname to bind http server to
  hostname: 'localhost',
  // automatically redirect
  auto: true,
  // http status code to use for automatic redirect
  redirectStatus: 302,
  // false or '/path/to/page' to redirect all requests to
  singleTarget: false,
  // html message format to print to clients
  message: 'Perhaps you are looking for ' +
           '<a href="%s" target="_self">the HTTPS site</a>?',
  // mime content type to use for message
  messageType: 'text/html',
  // http status code to use when showing message
  messageStatus: 404,
  // error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
  logLevel: 2
};

module.exports = function (options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  // Merge custom settings
  helpers.overwrite(settings, options);
  logger.logLevel = settings.logLevel;

  // Request handlers
  app.use(function (req, res, next) {
    logger.verbose('HTTP Request received : ' + settings.http + req.url);
    return next();
  });

  app.use(function (req, res) {
    // Set redirection url
    let url = util.format('https://%s:%d%s',
      req.headers.host.split(':')[0],
      settings.https,
      settings.singleTarget || req.originalUrl
    );
    logger.log(url);

    // Redirect automatically if specified
    if (settings.auto) {
      let headers = {
        Location: url
      };
      res.writeHead(settings.redirectStatus, headers);
      return res.end();
    }

    // Or respond with a 404 with custom message
    let body = util.format(settings.message, url);
    res.writeHead(
      settings.messageStatus,
      {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/html; charset=utf-8'
      }
    );
    res.write(body);
    res.end();
  });

  // Start listening for http connections
  const server = http.createServer(app).listen(settings.http, settings.hostname, function (err) {
    logger.info(
      'HTTP:%d -> HTTPS:%d redirection service started (%s)',
      settings.http, settings.https, settings.hostname
    );

    // Execute callback when server is running
    if (typeof cb === 'function') {
      return cb(err, settings);
    } else if (err) {
      logger.error(err);
    }
  });

  server.on('error', errorHandler);
};

function errorHandler(err) {
  let printedFull = false;

  switch (err.code) {
  case 'EACCES':
    logger.error('Permission denied when attempting to listen to port %d', settings.http);
    break;
  case 'EADDRINUSE':
    logger.error('Port %d is already in use', settings.http);
    break;
  default:
    logger.error(err);
    printedFull = true;
    break;
  }

  // Print error details in verbose mode
  if (!printedFull) {
    logger.verbose(err);
  }

  // Kill process on server errors
  process.exit(1);
}
