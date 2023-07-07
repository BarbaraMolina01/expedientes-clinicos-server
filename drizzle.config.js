export default {
  schema: './src/db/schemas',
  out: './src/db/migrations',
  driver: 'mysql2',
  connectionString: process.env.DATABASE_URL,
  breakpoints: true
}
