# http2s
Redirect HTTP requests to HTTPS

## Installation
Install with npm (https://www.npmjs.com/package/http2s)

```
npm install http2s
```

## Usage

```javascript
http2s([options,] [callback])
```

Calls `callback(err, activeSettings)` on done

### Options

Below options are the default values

```javascript
var settings = {
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
```
### Examples

If you are using port numbers >1000 because of permission issues, listen to that port instead.

```javascript
http2s({
  hostname: 'localhost',
  http: 8080
});
```

## License

Licensed under Creative Commons CC0 1.0 Universal. All rights waived.
See [LICENSE](LICENSE) for more information.

## Disclaimer

Use at own risk.
