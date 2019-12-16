const glob = require('glob')
const path = require('path')
const EventEmitter = require('events')
const Rule = require('./Rule')

class Linter extends EventEmitter {
  constructor (meta) {
    super()
    this.meta = meta
    this.rules = []
    this.assertions = []

    this._loadRules()
  }

  run () { throw new Error('you must implement the run() method') }

  each (document, meta) {
    this.rules.forEach(rule => rule.each(document, meta))
  }
  done () {
    this.rules.forEach(rule => rule.done())
  }

  _loadRules () {
    const base = path.resolve(__dirname, '../rules')
    const files = glob.sync(`${base}/**/*.js`, { realpath: true })

    this.rules = files
      .filter(rulepath => !rulepath.endsWith('.test.js'))
      .map(rulepath => require(rulepath))
      .filter(_Class => Rule.isPrototypeOf(_Class))
      .map(_Class => new _Class(this))
  }
}

module.exports = Linter
