import { mysqlTable, int, text, timestamp } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { sexoTable } from './index.js'

export const personaTable = mysqlTable('MPersona', {
  id: int('id_per').primaryKey().autoincrement(),
  nombre: text('nombre_per').notNull(),
  appat: text('appat_per').notNull(),
  apmat: text('apmat_per').notNull(),
  fecha_nac: timestamp('fechaNac_per').notNull(),

  id_sex: int('id_sex')
    .notNull()
    .references(() => sexoTable.id),

  createdAt: timestamp('createdAt_per').defaultNow(),
  updateAt: timestamp('updateAt_per').defaultNow()
})

export const personaRelations = relations(personaTable, ({ one }) => ({
  sexo: one(sexoTable, {
    fields: [personaTable.id_sex],
    references: [sexoTable.id]
  })
}))
