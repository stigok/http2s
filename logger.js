var util = require('util');
var helpers = require('./helpers');

/*
*  Log levels
*  error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
*/
var Logger = function (level) {
  this.logLevel = level || 2;
};

Logger.prototype._log = function (level) {
  // Don't log any more than we want
  if (level > this.logLevel) {
    return;
  }

  // Take all args but the first one and forward to util.format
  var args = Array.prototype.slice.call(arguments, 1);
  var message = util.format.apply(null, args);

  switch (level) {
    case 0:
      console.error(message);
      break;
    default:
      console.log(message);
      break;
  }
};

Logger.prototype.error = function () {
  var args = helpers.prependArguments(0, arguments);
  this._log.apply(this, args);
};

Logger.prototype.info = function () {
  var args = helpers.prependArguments(2, arguments);
  this._log.apply(this, args);
};

// Alias for Logger.info
Logger.prototype.log = function () {
  this.info.apply(this, arguments);
};

Logger.prototype.verbose = function () {
  var args = helpers.prependArguments(3, arguments);
  this._log.apply(this, args);
};

module.exports = new Logger();
