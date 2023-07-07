import { mysqlTable, int, timestamp } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { userTable, personaTable, sucursalTable } from './index.js'

export const especialistaTable = mysqlTable('MEspecialista', {
  id: int('id_esp').primaryKey().autoincrement(),

  id_user: int('id_user')
    .notNull()
    .references(() => userTable.id),
  id_per: int('id_per')
    .notNull()
    .references(() => personaTable.id),
  id_suc: int('id_suc')
    .notNull()
    .references(() => sucursalTable.id),

  createdAt: timestamp('createdAt_esp').defaultNow(),
  updateAt: timestamp('updateAt_esp').defaultNow()
})

export const especialistaRelations = relations(
  especialistaTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [especialistaTable.id_user],
      references: [userTable.id]
    }),

    persona: one(personaTable, {
      fields: [especialistaTable.id_per],
      references: [personaTable.id]
    }),

    sucursal: one(sucursalTable, {
      fields: [especialistaTable.id_suc],
      references: [sucursalTable.id]
    })
  })
)
