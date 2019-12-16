const through = require('through2')
const JSONStream = require('JSONStream')
const Linter = require('./Linter')

class StreamLinter extends Linter {
  open (stream) {
    this.stream = stream
  }
  run () {
    this.stream
      .pipe(JSONStream.parse())
      .pipe(through.obj((doc, _, next) => {
        this.each(doc)
        next()
      }))
      .on('finish', () => {
        this.done()
      })
  }
}

module.exports = StreamLinter
