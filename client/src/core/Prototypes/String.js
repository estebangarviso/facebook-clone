// proper case string prototype (JScript 5.5+)
/* eslint-disable */
String.prototype.toProperCase = function () {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) {
    return $1.toUpperCase();
  });
};
// sentence case string prototype (JScript 5.5+)
String.prototype.toSentenceCase = function () {
  let str = this ?? '';
  return str.toString().replace(/(^|\. *)([a-z])/g, function (match, separator, char) {
    return separator + char.toUpperCase();
  });
};
