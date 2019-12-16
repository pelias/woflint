const _ = require('lodash')
const Rule = require('./Rule')

class FieldRule extends Rule {
  // ensure field exists in document
  exists (document, field) {
    const exists = _.has(document, field)
    if (exists) { return }

    this.events.emit('assertion', {
      status: 'fail',
      message: 'missing field',
      field: field
    })
  }

  // ensure field is a string
  isString (document, field) {
    const exists = _.has(document, field)
    const value = _.get(document, field)
    if (!exists) { return }
    if (_.isString(value)) { return }

    this.events.emit('assertion', {
      status: 'fail',
      message: 'invalid string',
      field: field,
      value: value
    })
  }

  // ensure field is a string
  isNotEmpty (document, field) {
    const exists = _.has(document, field)
    let value = _.get(document, field)
    if (!exists) { return }

    if (_.isString(value)) { value = value.trim() }
    if (!_.isEmpty(value)) { return }

    this.events.emit('assertion', {
      status: 'fail',
      message: 'empty value',
      field: field,
      value: value
    })
  }

  // ensure field is a valid WOF ID
  isValidWOFID (document, field) {
    const exists = _.has(document, field)
    const value = _.get(document, field)
    if (!exists) { return }
    if (_.isFinite(value) && value >= 0) { return }

    this.events.emit('assertion', {
      status: 'fail',
      message: 'invalid WOF ID',
      field: field,
      value: value
    })
  }
}

module.exports = FieldRule
