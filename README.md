# http2s
HTTP to HTTPS redirection service, using [NodeJS](http://nodejs.org) and
[Connect](http://senchalabs.github.com/connect)

## Installation
Install with npm (https://www.npmjs.com/package/http2s)

    npm install http2s

## Quick start

Redirect clients from *http:8080* to *https:8443*

    npm run development

Redirect clients from *http:80* to *https:443*

    npm run production

## Usage

    http2s([options,] [callback])

Calls `callback(err, activeSettings)` on done

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

Run with defaults

    var http2s = require('../http2s.js')

    http2s(function(err, activeSettings) {
      if (err) throw new Error(err);
      console.log("port %d -> %d http2s redirection started",
                  activeSettings.http, activeSettings.https)
    })

With options

    var http2s = require('http2s')

    var options = {
      http: 8080,
      https: 8443,
      hostname: 'localhost',
      auto: true
    }

    http2s(options, function(err, activeSettings) {
      if (err) throw new Error(err);
      console.log('HTTP:%d -> HTTPS:%d redirection service started',
                  activeSettings.http, activeSettings.https
      )
    })

## Disclaimer

Use at own risk.

## License

Licensed under Creative Commons CC0 1.0 Universal. All rights waived.
See [LICENSE](https://github.com/stigok/http2s/blob/master/LICENSE) file
for more information.
