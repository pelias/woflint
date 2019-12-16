const FieldRule = require('./FieldRule')
const Rule = require('./Rule')

module.exports.interface = (test) => {
  test('interface', (t) => {
    const l = new FieldRule()
    t.true(l instanceof FieldRule)
    t.true(l instanceof Rule)
    t.end()
  })
}
