var connect = require('connect')
var util = require('util')
var app = connect()
var helpers = require('./helpers.js')

// Default settings
var settings = {
  http: 80,              // http port to listen to
  https: 443,            // https port to redirect to
  hostname: 'localhost', // server hostname or ip
  auto: true,            // automatically redirect
  statuscode: 303,       // http status code to use for automatic redirect
  singleTarget: false,   // false or '/path/to/page' to redirect all requests to
                         // html message format to print to clients
  message: 'Perhaps you were looking for' +
           '<a href="%s" target="_self">the HTTPS site</a>?',
  verbose: false         // print all status messages to console
}

// Catch all requests and provide link to https site
var requestHandler = function(req, res) {
  if (settings.verbose) console.log('HTTP Request received for :' + settings.http + req.url)

  // Set redirection url
  var url = util.format('https://%s:%d%s', {
    settings.hostname,
    settings.https,
    settings.singleTarget || req.url
  })

  // Redirect automatically or respond with a 404 with custom message
  if (settings.auto) {
    res.writeHead(settings.statuscode, { 'Location' : url })
    return res.end()
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    return res.end(util.format(settings.message, url))
  }
}

module.exports = function(options, cb) {
  // Set custom user options
  if (options && typeof options === "object")
    helpers.extend(settings, options)

  // Register request handler
  app.use(requestHandler)
  var server = app.listen(settings.http, settings.hostname, function() {
    if (settings.verbose) {
      console.info('HTTP:%d -> HTTPS:%d redirection service started (%s)',
                   settings.http,
                   settings.https,
                   settings.hostname
      )
    }

    // Execute callback when server is running
    if (cb && typeof cb === "function") return cb(null, server)
  })
}
