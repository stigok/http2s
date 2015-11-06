var connect = require('connect');
var util = require('util');
var app = connect();
var helpers = require('./helpers.js');
var logger = require('./logger');

// Default settings
var settings = {
  // http port to listen to
  http: 80,
  // https port to redirect to
  https: 443,
  // server hostname or ip
  hostname: 'localhost',
  // automatically redirect
  auto: true,
  // http status code to use for automatic redirect
  redirectStatus: 303,
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

  // Register request handler
  app.use(requestHandler);

  // Start listening for http connections
  var server = app.listen(settings.http, settings.hostname, function (err) {
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

function requestHandler(req, res) {
  logger.verbose('HTTP Request received : ' + settings.http + req.url);

  // Set redirection url
  var url = util.format('https://%s:%d%s',
    settings.hostname,
    settings.https,
    settings.singleTarget || req.url
  );

  // Redirect automatically if specified
  if (settings.auto) {
    res.writeHead(settings.redirectStatus, {Location: url});
    return res.end();
  }

  // Or respond with a 404 with custom message
  var body = util.format(settings.message, url);
  res.writeHead(
    settings.messageStatus,
    {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html; charset=utf-8'
    }
  );
  res.write(body);
  res.end();
}

function errorHandler(err) {
  var printedFull = false;

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
