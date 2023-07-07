import {
  mysqlTable,
  int,
  text,
  varchar,
  boolean,
  timestamp
} from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import {
  personaTable,
  especialistaTable,
  userTable,
  estadoCivilTable,
  sucursalTable
} from './index.js'

export const pacienteTable = mysqlTable('MPaciente', {
  id: int('id_pac').primaryKey().autoincrement(),
  telefono: varchar('tel_pac', { length: 10 }).notNull(),
  domicilio: text('domi_pac').notNull(),
  lugar_nac: text('lugarNac_pac').notNull(),
  dni: varchar('dni_pac', { length: 8 }).notNull(),
  ocupacion: text('ocup_pac').notNull(),
  desocupado_por_adiccion: boolean('desocPorAd_pac').notNull(),
  religion: text('religion_pac').notNull(),
  separado_por_adiccion: boolean('sepPorAd_pac').notNull(),
  fecha_ingreso: timestamp('fechaIng_pac').notNull(),
  paretensco: text('parent_pac').notNull(),

  id_user: int('id_user')
    .notNull()
    .references(() => userTable.id),
  id_per: int('id_per')
    .notNull()
    .references(() => personaTable.id),
  persona_responsable: int('persResp_pac')
    .notNull()
    .references(() => especialistaTable.id),
  evaluador: int('eval_pac')
    .notNull()
    .references(() => especialistaTable.id),
  id_estCiv: int('id_estCiv')
    .notNull()
    .references(() => estadoCivilTable.id),
  id_suc: int('id_suc')
    .notNull()
    .references(() => sucursalTable.id),

  createdAt: timestamp('createdAt_pac').defaultNow(),
  updateAt: timestamp('updateAt_pac').defaultNow()
})

export const pacienteRelations = relations(pacienteTable, ({ one }) => ({
  user: one(userTable, {
    fields: [pacienteTable.id_user],
    references: [userTable.id]
  }),

  persona: one(personaTable, {
    fields: [pacienteTable.id_per],
    references: [personaTable.id]
  }),

  responsable: one(especialistaTable, {
    fields: [pacienteTable.persona_responsable],
    references: [especialistaTable.id]
  }),

  evaluador: one(especialistaTable, {
    fields: [pacienteTable.evaluador],
    references: [especialistaTable.id]
  }),

  estado_civil: one(estadoCivilTable, {
    fields: [pacienteTable.id_estCiv],
    references: [estadoCivilTable.id]
  }),

  sucursal: one(sucursalTable, {
    fields: [pacienteTable.id_suc],
    references: [sucursalTable.id]
  })
}))
