var connect = require('connect')
var util = require('util')
var app = connect()
var helpers = require('./helpers.js')

// Default settings
var settings = {
  http: 80,                // http port to listen to
  https: 443,              // https port to redirect to
  hostname: 'localhost',   // server hostname or ip
  auto: true,              // automatically redirect
  redirectStatus: 303,     // http status code to use for automatic redirect
  singleTarget: false,     // false or '/path/to/page' to redirect all requests to
                           // html message format to print to clients
  message: 'Perhaps you were looking for' +
           '<a href="%s" target="_self">the HTTPS site</a>?',
  messageType: 'text/html',// mime content type to use for message
  messageStatus: 404,      // http status code to use when showing message
  verbose: false           // print all status messages to console
}

// Catch all requests and provide link to https site
var requestHandler = function(req, res) {
  if (settings.verbose) console.log('HTTP Request received for :' + settings.http + req.url)

  // Set redirection url
  var url = util.format('https://%s:%d%s',
    settings.hostname,
    settings.https,
    settings.singleTarget || req.url
  )

  // Redirect automatically or respond with a 404 with custom message
  if (settings.auto) {
    res.writeHead(settings.redirectStatus, { 'Location' : url })
    return res.end()
  }
  else {
    res.writeHead(settings.messageStatus,
                  { 'Content-Type': 'text/html; charset=utf-8' },
                  util.format(settings.message, url));
    return res.end();
  }
}

module.exports = function(options, cb) {
  // Set custom user options
  if (options && typeof options === "object")
    helpers.overwrite(settings, options)

  // Register request handler
  app.use(requestHandler)
  app.listen(settings.http, settings.hostname, function() {
    if (settings.verbose) {
      console.info('HTTP:%d -> HTTPS:%d redirection service started (%s)',
                   settings.http, settings.https, settings.hostname)
    }

    // Execute callback when server is running
    if (cb && typeof cb === "function") return cb(null, settings)
  })

  server.on('error', function(err) {
    var printedFull = false;

    switch (err.code) {
      case "EACCES":
        console.error("Permission denied on attempt to listen to port " + settings.http);
        break;
      case "EADDRINUSE":
        console.error("Port " + settings.http +" is already in use");
        break;
      default:
        console.error(err);
        printedFull = true;
        break;
    }

    // Print original error as well in verbose mode
    if (!printedFull && settings.verbose) console.error(err);

    // Kill process on server errors
    process.exit(1);
  });
}
