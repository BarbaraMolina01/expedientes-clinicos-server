import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from 'mysql2/promise'

// import { fetch } from 'undici'

import 'dotenv/config'

// inspired by Raphael Moreau @rphlmr for Postgres, extended for MySQL
const runMigrate = async () => {
  // if (!process.env.DATABASE_URL) {
  //   throw new Error('DATABASE_URL is not defined')
  // }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
  })

  const db = drizzle(connection)

  // const connection = connect({
  //   url: process.env.DATABASE_URL,
  //   fetch
  // })

  // const db = drizzle(connection)

  console.log('⏳ Running migrations...')

  const start = Date.now()

  await migrate(db, { migrationsFolder: 'src/db/migrations' })

  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error('❌ Migration failed')
  console.error(err)
  process.exit(1)
})
