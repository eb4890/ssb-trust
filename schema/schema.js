const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'operation', 'value', 'resource', 'trustee'],
  properties: {
    type: {
      type: 'string',
      pattern: '^trust$'
    },
    operation: {
      type: 'string'
    },
    value: {
      type: 'string',
      pattern: '^(trust|suspect|implicit-trust|implicit-suspect|neutral)$'
    },
    resource: {
      type: 'string'
    },
    trustee: { $ref: '#/definitions/feedId' }
  },
  definitions
}
