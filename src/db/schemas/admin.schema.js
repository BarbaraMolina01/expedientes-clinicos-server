import { mysqlTable, int, timestamp } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { userTable } from './user.schema.js'

export const adminTable = mysqlTable('MAdmin', {
  id: int('id_adm').primaryKey().autoincrement(),

  id_user: int('id_user')
    .notNull()
    .references(() => userTable.id),

  createdAt: timestamp('createdAt_adm').defaultNow(),
  updateAt: timestamp('updateAt_adm').defaultNow()
})

export const adminRelations = relations(adminTable, ({ one }) => ({
  user: one(userTable, {
    fields: [adminTable.id_user],
    references: [userTable.id]
  })
}))
