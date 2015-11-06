module.exports.overwrite = function (obj, extensions) {
  for (var i in extensions) {
    if (obj.hasOwnProperty(i)) {
      obj[i] = extensions[i];
    }
  }
};

module.exports.prependArgument = function (additional, existing) {
  var args = [additional];
  for (var i = 0; i < existing.length; i++) {
    args.push(existing[i]);
  }
  return args;
};
