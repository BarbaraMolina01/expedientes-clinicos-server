import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core'

export const estadoCivilTable = mysqlTable('CEstadoCivil', {
  id: int('id_estCiv').primaryKey().autoincrement(),
  nombre: varchar('nombre_estCiv', { length: 50 }).notNull(),

  createdAt: timestamp('createdAt_estCiv').defaultNow(),
  updateAt: timestamp('updateAt_estCiv').defaultNow()
})
