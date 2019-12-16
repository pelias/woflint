const FieldRule = require('../../lib/FieldRule')

class WofNameRule extends FieldRule {
  each (document) {
    this.exists(document, 'properties.wof:name')
    this.isString(document, 'properties.wof:name')
    this.isNotEmpty(document, 'properties.wof:name')
  }
}

module.exports = WofNameRule
