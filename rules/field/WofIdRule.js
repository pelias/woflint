const FieldRule = require('../../lib/FieldRule')

class WofIdRule extends FieldRule {
  each (document) {
    this.exists(document, 'properties.wof:id')
    this.isValidWOFID(document, 'properties.wof:id')
  }
}

module.exports = WofIdRule
