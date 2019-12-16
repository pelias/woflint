const EventEmitter = require('events')
const StreamLinter = require('./StreamLinter')

module.exports.interface = (test) => {
  test('interface', (t) => {
    const l = new StreamLinter()
    t.true(l instanceof StreamLinter)
    t.true(l instanceof EventEmitter)
    t.end()
  })
}
