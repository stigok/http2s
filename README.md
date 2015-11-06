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

Calls `callback(err, settings)` on done, where `settings` is an object
containing the current settings.

### Options

Below options are the default values

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

### Examples

See [bin/default](bin/default) and [bin/development](bin/development) for usage examples.

## License

Licensed under Creative Commons CC0 1.0 Universal. All rights waived.
See [LICENSE](LICENSE) for more information.

## Disclaimer

Use at own risk.
