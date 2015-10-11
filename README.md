# http2s
HTTP to HTTPS redirection service, using [NodeJS](http://nodejs.org) and
[Connect](http://senchalabs.github.com/connect)

## Installation
Install with NPM

    npm install http2s

or clone repo and take care of dependencies yourself

    git clone https://github.com/stigok/http2s.git && cd http2s
    npm install

## Usage

    http2s([options,], callback)
    // callback called with callback(err, httpServer)

## Options

  Below options are the default values

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
      messageType: 'text/html' // mime content type to use for message
      messageStatus: 404,      // http status code to use when showing message
      verbose: false           // print all status messages to console
    }

## Examples

Simple

    var http2s = require('../http2s.js')

    http2s(function(err, settings) {
      console.log("port %d -> %d http2s redirection started",
                  settings.http, settings.https)
    })

With options

    var http2s = require('http2s')

    var options = {
      http: 8080,
      https: 8443,
      hostname: 'localhost',
      auto: true
    }

    http2s(options, function(err, server) {
      console.log('HTTP:%d -> HTTPS:%d redirection service started',
                  options.http,
                  options.https
      )
    })

## Run tests

    npm install --dev
    npm test

## Disclaimer

Use at own risk.

## License

Licensed under Creative Commons CC0 1.0 Universal. All rights waived.
Please see [LICENSE](https://github.com/stigok/http2s/blob/master/LICENSE) file
for more information.
