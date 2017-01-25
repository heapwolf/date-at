var test = require('tape')
var date = require('.')

var re = /\[object (\w+)\]/
function type (v) {
  return ({}).toString.call(v).match(re)[1]
}

test('export is a function that creates a date', function (assert) {
  assert.equal(type(date()), 'Date')
  assert.equal(type(date('now')), 'Date')
  assert.end()
})

test('future date', function (assert) {
  assert.ok(date('+1day') > Date.now())
  assert.end()
})

test('past date', function (assert) {
  assert.ok(date('-1day') < Date.now())
  assert.end()
})

