import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core'

export const rolTable = mysqlTable('CRol', {
  id: int('id_rol').primaryKey().autoincrement(),
  nombre: varchar('nombre_rol', { length: 50 }).notNull(),

  createdAt: timestamp('createdAt_rol').defaultNow(),
  updateAt: timestamp('updateAt_rol').defaultNow()
})
