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

### Options

    var options = {
      http: 80,              // http port to listen to
      https: 443,            // https port to redirect to
      hostname: 'localhost', // server hostname or ip
      auto: false,           // automatically redirect
      statuscode: 302,       // http status code to use for automatic redirect
                             // redirect all requests to same url
      singleTarget: '/account/user'
                             // html message format to print to clients
      message: 'Perhaps you were looking for <a href="%s" target="_self">the HTTPS site</a>?',
      verbose: false         // print all status messages to console
    }
