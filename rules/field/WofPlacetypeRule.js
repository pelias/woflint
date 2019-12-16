const FieldRule = require('../../lib/FieldRule')

class WofPlacetypeRule extends FieldRule {
  each (document) {
    this.exists(document, 'properties.wof:placetype')
    this.isString(document, 'properties.wof:placetype')
    this.isNotEmpty(document, 'properties.wof:placetype')
  }
}

module.exports = WofPlacetypeRule
