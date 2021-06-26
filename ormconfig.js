console.log('process.env.DATABASE_URL :>>', process.env.DATABASE_URL );
module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "migrations": ["./dist/database/migration/*.js"],
  "entities": ["dist/entities/*.js"],
  "cli": {
    "migrationsDir": "./src/database/migration",
    "entitiesDir": "src/entities"
  }
}