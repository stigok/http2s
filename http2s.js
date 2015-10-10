var util = require('util')
var connect = require('connect')
var http = require('http')
var app = connect()
var helpers = require('./helpers.js')

var settings = {
  http: 8080,
  https: 8445,
  hostname: 'localhost',
  message: 'Perhaps you were looking for <a href="%s" target="_self">the HTTPS site</a>?',
  auto: false,
  statuscode: 303
}

// Catch all requests and provide link to https site
var requestHandler = function(req, res) {
  console.log('HTTP Request received for :' + settings.http + req.url)
  var url = ['https://', settings.hostname, ':', settings.https, req.url].join('')
  if (settings.auto) {
    res.writeHead(settings.statuscode, { 'Location' : url });
    return res.end()
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    return res.end(util.format(settings.message, url))
  }
}

module.exports = function(options, cb) {
  helpers.extend(settings, options)
  app.use(requestHandler)
  var server = app.listen(settings.http, settings.hostname, function() {
    if (typeof cb === "function") return cb(null, server)
  })
}
