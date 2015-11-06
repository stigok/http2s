module.exports.overwrite = function (obj, extensions) {
  for (var i in extensions) {
    if (obj.hasOwnProperty(i)) {
      obj[i] = extensions[i];
    }
  }
};

// Takes function arguments obj and returns new array with additional arg prepended
module.exports.prependArguments = function (additionals, existing) {
  var args = (typeof additionals === 'string') ? [additionals] : additionals.slice(0);
  for (var i = 0; i < existing.length; i++) {
    args.push(existing[i]);
  }
  return args;
};
