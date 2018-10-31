const test = require('tape')

const valid = require('./validator')

const trust = () => {
  return {
    'key': '%r8Ol0jrDXRdwC1QU8LMiI6eLm4i35pRYTfHg+0N7HGQ=.sha256',
    'value': {
      'previous': '%J/qLJvGH9/cbbrBlk7pLGyhPXZqOXFNLf/r84djxvkQ=.sha256',
      'sequence': 14155,
      'author': '@NeB4q4Hy9IiMxs5L08oevEhivxW+/aDu/s/0SkNayi0=.ed25519',
      'timestamp': 1540676859557,
      'hash': 'sha256',
      'content': {
        'type': 'trust',
        'trustee': '@NeB4q4Hy9IiMxs5L08oevEhivxW+/aDu/s/0SkNayi0=.ed25519',
        'value': 'trust',
        'resource': 'scuttle.git-ssb',
        'operation': 'git.push.master'
      }
    }
  }
}

test('is-trust', t => {
  t.true(valid(trust()), 'valid trust')
  if (valid.errors) console.log(valid.errors)

  t.end()
})
