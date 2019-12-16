const EventEmitter = require('events')
const Linter = require('./Linter')

module.exports.interface = (test) => {
  test('interface', (t) => {
    const l = new Linter()
    t.true(l instanceof Linter)
    t.true(l instanceof EventEmitter)
    t.end()
  })
}
