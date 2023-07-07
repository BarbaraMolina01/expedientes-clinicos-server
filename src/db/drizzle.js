import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER
} from '../lib/index.js'
import * as schema from './schemas/index.js'

const poolConnection = mysql.createPool({
  // connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
})

export const db = drizzle(poolConnection, { schema })
