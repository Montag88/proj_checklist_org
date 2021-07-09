function _deepCopy(obj) {
  var deepCopy = JSON.parse(JSON.stringify(obj));
  return deepCopy;
};