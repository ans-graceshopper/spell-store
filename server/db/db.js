const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const createDatabase = () => {
  if (process.env.USER === 'notnull') {
    const db = new Sequelize('spellbinder', 'fsa', 'secretPassword123', {
      dialect: 'postgres',
    })
    return db
  } else {
    const db = new Sequelize(
      process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
      {
        logging: false,
      }
    )
    return db
  }
}

const db = createDatabase()
// Amy & November v
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   {
//     logging: false,
//   }
// )

// Amy & November v
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   {
//     logging: false,
//   }
// )

// Sarah v
//const db = new Sequelize()

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
