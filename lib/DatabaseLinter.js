const fs = require('fs')
const Database = require('better-sqlite3')
const Linter = require('./Linter')

class DatabaseLinter extends Linter {
  open (filepath) {
    // ensure path readable
    try {
      fs.accessSync(filepath, fs.constants.R_OK)
    } catch (e) {
      throw new Error('unable to read file')
    }

    // open database read-only
    this.db = new Database(filepath, { readonly: true })

    // ensure valid database
    const rows = this.db
      .prepare('SELECT * FROM sqlite_master WHERE type = "table" AND name = ?')
      .get('geojson')

    if (!rows) {
      throw new Error('table not found: geojson')
    }
  }
  close () {
    this.db.close()
  }
  run () {
    const stmt = this.db.prepare('SELECT * FROM geojson')
    for (const row of stmt.iterate()) {
      const data = JSON.parse(row.body)
      const meta = { table: 'geojson', id: row.id }

      this.each(data, meta)
    }
    this.done()
  }
}

module.exports = DatabaseLinter
