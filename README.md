# http2s
HTTP to HTTPS redirection service, using [NodeJS](http://nodejs.org) and
[Connect](http://senchalabs.github.com/connect)

# Usage

    var http2s = require('http2s')

    var options = {
      http: 80,
      https: 443,
      hostname: 'localhost',
      auto: true,
      statuscode: 302
    }

    http2s(options, function(err, server) {
      console.log('HTTP:%d -> HTTPS:%d redirection service started',
                  options.http,
                  options.https
      )
    })
