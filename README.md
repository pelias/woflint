
#### Lint a SQLite database:

```bash
node bin/cli.js example.db
```

#### Lint a local geojson file:

```bash
node bin/cli.js example.geojson
```

#### Lint a remote geojson file:

```bash
node bin/cli.js https://raw.githubusercontent.com/whosonfirst-data/whosonfirst-data-admin-cn/master/data/102/550/367/102550367.geojson
```

#### Lint geojson from stdin:

```bash
cat example.geojson | node bin/cli.js -
```

#### Lint a local bundle file:

```bash
tar -xOzf example.tar.bz2 '*.geojson' | node bin/cli.js -
```

#### Lint a remote bundle file:

```bash
curl -s https://dist.whosonfirst.org/bundles/whosonfirst-data-borough-latest.tar.bz2 | tar -xOz '*.geojson' | node bin/cli.js -
```
