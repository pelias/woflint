const fs = require('fs')
const StreamLinter = require('./StreamLinter')

class FileLinter extends StreamLinter {
  open (filepath) {
    // ensure path readable
    try {
      fs.accessSync(filepath, fs.constants.R_OK)
    } catch (e) {
      throw new Error('unable to read file')
    }

    // create read stream
    this.stream = fs.createReadStream(filepath, 'utf8')
  }
}

module.exports = FileLinter
