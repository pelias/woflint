const _ = require('lodash')
const request = require('superagent')
const FileLinter = require('../lib/FileLinter')
const StreamLinter = require('../lib/StreamLinter')
const DatabaseLinter = require('../lib/DatabaseLinter')
const filepath = _.nth(process.argv, 2)

// super simple reporter
const reporter = (events) => {
  events.on('assertion', assertion => {
    console.error(assertion)
  })
}

if (!filepath) {
  console.error('invalid filepath specified')
  process.exit(1)
}

// lint a sqlite database
if (filepath.endsWith('.db')) {
  const db = new DatabaseLinter({ filepath })
  reporter(db)
  db.open(filepath)
  db.run()
  db.close()

// lint a remote geojson file
} else if (filepath.startsWith('http') && filepath.endsWith('.geojson')) {
  const stream = new StreamLinter({ filepath })
  reporter(stream)
  stream.open(request.get(filepath))
  stream.run()

// lint a local geojson file
} else if (filepath.endsWith('.geojson')) {
  const file = new FileLinter({ filepath })
  reporter(file)
  file.open(filepath)
  file.run()

// lint a geojson file from stdin
} else if (filepath === '-' || filepath === '/dev/stdin') {
  const stream = new StreamLinter({ filepath: '/dev/stdin' })
  reporter(stream)
  stream.open(process.stdin)
  stream.run()

// unsupported file type
} else {
  console.error(`unsupported file type: ${filepath}`)
  process.exit(1)
}
