module.exports = function (str) {
  var d = new Date()

  if (str === 'now' || !str) return d

  var op = str[0]
  str = str.slice(1)

  var qty = parseInt(str, 10)
  var unit = str.slice(String(qty).length).trim()

  var YEARS = ['years', 'year', 'yr', 'Y']
  var MONTHS = ['months', 'month', 'mo', 'M']
  var WEEKS = ['weeks', 'week', 'w']
  var DAYS = ['days', 'day', 'd']
  var HOURS = ['hours', 'hour', 'h']
  var MINUTES = ['minutes', 'minute', 'min', 'm']
  var SECONDS = ['seconds', 'second', 'sec', 's']
  var MILLISECONDS = ['milliseconds', 'millisecond', 'ms']

  function compare (unit) {
    return function (a) {
      return a.indexOf(unit) > -1
    }
  }

  function calc (d, qty, unit) {
    qty = (op === '+' ? 1 : -1) * qty
    var is = compare(unit)

    if (is(YEARS)) {
      d.setFullYear(d.getFullYear() + qty)
    } else if (is(MONTHS)) {
      d.setMonth(d.getMonth() + qty)
    } else if (is(WEEKS)) {
      return calc(d, qty * 7, 'days')
    } else if (is(DAYS)) {
      d.setDate(d.getDate() + qty)
    } else if (is(HOURS)) {
      d.setHours(d.getHours() + qty)
    } else if (is(MINUTES)) {
      d.setMinutes(d.getMinutes() + qty)
    } else if (is(SECONDS)) {
      d.setSeconds(d.getSeconds() + qty)
    } else if (is(MILLISECONDS)) {
      d.setMilliseconds(d.getMilliseconds() + qty)
    } else {
      throw new Error('Invalid unit: ' + unit)
    }
    return d
  }

  return calc(d, qty, unit)
}
