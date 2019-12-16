const _ = require('lodash')
const Rule = require('../../lib/Rule')

class HierarchyConsistencyRule extends Rule {
  constructor (events) {
    super(events)
    this.documents = new Map()
    this.relationships = new Map()
  }
  each (document) {
    // store all documents ids with placetype
    const docId = _.get(document, 'properties.wof:id', Infinity)
    if (!_.isFinite(docId)) { return }

    const docPlacetype = _.get(document, 'properties.wof:placetype', '')
    if (!_.isString(docPlacetype) || _.isEmpty(docPlacetype)) { return }

    this.documents.set(docId, { id: docId, placetype: docPlacetype })

    // store all relationships between documents
    const hierarchy = _.get(document, 'properties.wof:hierarchy', [])
    if (!_.isArray(hierarchy)) { return }

    const docRelations = []
    _.each(hierarchy, h => _.each(h, (wofid, key) => {
      const placetype = key.replace(/_id$/, '')
      docRelations.push({ id: wofid, placetype })
    }))

    this.relationships.set(docId, docRelations)
  }
  done () {
    this.relationships.forEach((relations, docid) => {
      const doc = this.documents.get(docid)

      relations.forEach(relation => {
        const rel = this.documents.get(relation.id)

        // ensure all relationships exist within collection
        if (!rel) {
          let status = this.documents.size > 1 ? 'error' : 'warning'
          let warnings = ['planet', 'ocean', 'continent', 'empire']
          if (warnings.includes(relation.placetype)) { status = 'warning' }

          this.events.emit('assertion', {
            status: status,
            message: 'hierarchy reference not found in collection',
            document: doc,
            relation: relation
          })

          // ensure all placetypes match what they are in the hierarchy
        } else if (relation.placetype !== rel.placetype) {
          this.events.emit('assertion', {
            status: 'error',
            message: 'hierarchy placetype differs from document placetype',
            document: doc,
            relation: rel
          })
        }
      })
    })
  }
}

module.exports = HierarchyConsistencyRule
