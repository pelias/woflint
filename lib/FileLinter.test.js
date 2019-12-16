const EventEmitter = require('events')
const FileLinter = require('./FileLinter')
const StreamLinter = require('./StreamLinter')

module.exports.interface = (test) => {
  test('interface', (t) => {
    const l = new FileLinter()
    t.true(l instanceof FileLinter)
    t.true(l instanceof StreamLinter)
    t.true(l instanceof EventEmitter)
    t.end()
  })
}
