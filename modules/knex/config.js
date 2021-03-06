var lib = require('../../lib')

module.exports =  {
  maxCLIArgs: 1,
  pultModuleDeps: [],
  pultModuleConflicts: [],
  get: function get (vfs, baseConfig, moduleArgs) {

    var dialect = dialectMap[ moduleArgs[0] ]
    if ( ! dialect ) {
      let options = Object.keys(driverMap).sort()
      throw new lib.errors.ModuleError(`Module ${
        lib.c.subject('knex')
      } needs a dialect. Options are:\n\n    ${
        options.join(', ')
      }\n\nUpon choosing, re-run the command like this:\n\n    $ pult add knex postgres`)
    }

    var config = {

      client: driverMap[dialect],

      dependencies: {
        knex: '^0.12.5',
        [driverMap[dialect]]: '*',
      }
    }

    config.installs = Object.keys(config.dependencies)

    return config
  }
}

// Taken from https://github.com/tgriesser/knex/tree/3609de76b34cb9ed6171505f3b614c0526c0e9ca/src/dialects
var dialectMap = {
  'maria':          'maria',
  'mariadb':        'maria',
  'mariasql':       'maria',
  'mssql':          'mssql',
  'mysql':          'mysql',
  'mysql2':         'mysql2',
  'oracle':         'oracle',
  'oracledb':       'oracledb',
  'pg':             'postgres',
  'postgres':       'postgres',
  'sqlite':         'sqlite3',
  'sqlite3':        'sqlite3',
  'strong-oracle':  'strong-oracle',
  'websql':         'websql',
}

var driverMap = {
  'maria':          'mariasql',
  'mssql':          'mssql',
  'mysql':          'mysql',
  'mysql2':         'mysql2',
  'oracle':         'oracle',
  'oracledb':       'oracledb',
  'postgres':       'pg',
  'sqlite3':        'sqlite3',
  'websql':         'websql',
  'strong-oracle':  'strong-oracle',
}
