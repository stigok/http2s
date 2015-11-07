module.exports.overwrite = function (obj, extensions) {
  for (var i in extensions) {
    if (obj.hasOwnProperty(i)) {
      obj[i] = extensions[i];
    }
  }
};

// Takes function arguments obj and returns new array with additional arg prepended
module.exports.prependArguments = function (additionals, existing) {
  var args = [];
  var i;

  if (Array.isArray(additionals)) {
    for (i = 0; i < additionals.length; i++) {
      args.push(additionals[i]);
    }
  } else {
    // if single value supplied
    args.push(additionals);
  }

  for (i = 0; i < existing.length; i++) {
    args.push(existing[i]);
  }

  return args;
};
