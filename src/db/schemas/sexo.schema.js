import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core'

export const sexoTable = mysqlTable('CSexo', {
  id: int('id_sex').primaryKey().autoincrement(),
  nombre: varchar('nombre_sex', { length: 50 }).notNull(),

  createdAt: timestamp('createdAt_sex').defaultNow(),
  updateAt: timestamp('updateAt_sex').defaultNow()
})
