module.exports.overwrite = function (obj, extensions) {
  for (var i in extensions) {
    if (obj.hasOwnProperty(i)) {
      obj[i] = extensions[i];
    }
  }
};
