const Rule = require('./Rule')

module.exports.interface = (test) => {
  test('interface', (t) => {
    const l = new Rule()
    t.true(l instanceof Rule)
    t.end()
  })
}
