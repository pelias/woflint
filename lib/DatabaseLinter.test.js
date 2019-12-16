const EventEmitter = require('events')
const DatabaseLinter = require('./DatabaseLinter')

module.exports.interface = (test) => {
  test('interface', (t) => {
    const l = new DatabaseLinter()
    t.true(l instanceof DatabaseLinter)
    t.true(l instanceof EventEmitter)
    t.end()
  })
}
