import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core'

export const sucursalTable = mysqlTable('CSucursal', {
  id: int('id_suc').primaryKey().autoincrement(),
  nombre: varchar('nombre_suc', { length: 100 }).notNull(),

  createdAt: timestamp('createdAt').defaultNow(),
  updateAt: timestamp('updateAt').defaultNow()
})
