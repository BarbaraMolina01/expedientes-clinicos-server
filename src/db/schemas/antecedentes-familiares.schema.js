import {
  mysqlTable,
  int,
  boolean,
  text,
  timestamp
} from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { pacienteTable } from './index.js'

export const antecedentesFamiliaresTable = mysqlTable(
  'MAntecedentesFamiliares',
  {
    id: int('id_antFam').primaryKey().autoincrement(),
    padre: boolean('pad_antFam').notNull(),
    madre: boolean('mad_antFam').notNull(),
    abueloPat: boolean('abueloPat_antFam').notNull(),
    abuelaPat: boolean('abueloPat_antFam').notNull(),
    abueloMat: boolean('abueloMat_antFam').notNull(),
    abuelaMat: boolean('abueloMat_antFam').notNull(),
    tios: boolean('tios_antFam').notNull(),
    otros: text('otros_antFam'),

    id_pac: int('id_pac')
      .notNull()
      .references(() => pacienteTable.id),

    createdAt: timestamp('createdAt_antFam').defaultNow(),
    updateAt: timestamp('updateAt_antFam').defaultNow()
  }
)

export const antecedentesFamiliaresRelations = relations(
  antecedentesFamiliaresTable,
  ({ one }) => ({
    paciente: one(pacienteTable, {
      fields: [antecedentesFamiliaresTable.id_pac],
      references: [pacienteTable.id]
    })
  })
)
