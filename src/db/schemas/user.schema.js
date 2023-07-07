import { mysqlTable, text, int, timestamp } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { rolTable } from './index.js'

export const userTable = mysqlTable('MUser', {
  id: int('id_user').primaryKey().autoincrement(),
  email: text('email_user').notNull(),
  password: text('password_user').notNull(),

  id_rol: int('id_rol')
    .notNull()
    .references(() => rolTable.id),

  createdAt: timestamp('createdAt_user').defaultNow(),
  updateAt: timestamp('updateAt_user').defaultNow()
})

export const userRelations = relations(userTable, ({ one }) => ({
  rol: one(rolTable, {
    fields: [userTable.id_rol],
    references: [rolTable.id]
  })
}))

// export const users = mysqlTable('users', {
//   id: serial('id').primaryKey().autoincrement(),
//   name: text('name')
// })

// export const usersRelations = relations(users, ({ many }) => ({
//   usersToGroups: many(usersToGroups)
// }))

// export const groups = mysqlTable('groups', {
//   id: serial('id').primaryKey(),
//   name: text('name')
// })

// export const groupsRelations = relations(groups, ({ many }) => ({
//   usersToGroups: many(usersToGroups)
// }))

// export const usersToGroups = mysqlTable(
//   'users_to_groups',
//   {
//     userId: bigint('user_id', { mode: 'number' | 'bigint' }).references(
//       () => users.id
//     ),
//     groupId: bigint('group_id', { mode: 'number' | 'bigint' }).references(
//       () => groups.id
//     )
//   },
//   (t) => ({
//     pk: primaryKey(t.userId, t.groupId)
//   })
// )

// export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
//   group: one(groups, {
//     fields: [usersToGroups.groupId],
//     references: [groups.id]
//   }),
//   user: one(users, {
//     fields: [usersToGroups.userId],
//     references: [users.id]
//   })
// }))

// // declaring enum in database
// export const countries = mysqlTable(
//   'countries',
//   {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 256 })
//   },
//   (countries) => ({
//     nameIndex: uniqueIndex('name_idx').on(countries.name)
//   })
// )

// export const cities = mysqlTable('cities', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 256 }),
//   countryId: bigint('country_id', { mode: 'number' | 'bigint' }).references(
//     () => countries.id
//   ),
//   popularity: mysqlEnum('popularity', ['unknown', 'known', 'popular'])
// })

// bigint('...', { mode: 'number' | 'bigint' })

// export const stores = mysqlTable('stores', {
//   id: int('id').primaryKey().autoincrement(),
//   userId: varchar('userId', { length: 191 }).notNull(),
//   name: varchar('name', { length: 191 }).notNull(),
//   description: text('description'),
//   slug: text('slug'),
//   createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
//     .notNull()
//     .default(sql`CURRENT_TIMESTAMP(3)`)
// })

// export const storesRelations = relations(stores, ({ many }) => ({
//   products: many(products)
// }))

// export const products = mysqlTable('products', {
//   id: int('id').primaryKey().autoincrement(),
//   name: varchar('name', { length: 191 }).notNull(),
//   description: text('description'),
//   images: json('images').$type().default(null),
//   category: mysqlEnum('category', [
//     'skateboards',
//     'clothing',
//     'shoes',
//     'accessories'
//   ])
//     .notNull()
//     .default('skateboards'),
//   subcategory: varchar('subcategory', { length: 191 }),
//   price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0'),
//   inventory: int('inventory').notNull().default(0),
//   rating: int('rating').notNull().default(0),
//   tags: json('tags').$type().default(null),
//   storeId: int('storeId')
//     .notNull()
//     .references(() => stores.id),
//   createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
//     .notNull()
//     .default(sql`CURRENT_TIMESTAMP(3)`)
// })

// export const productsRelations = relations(products, ({ one }) => ({
//   store: one(stores, { fields: [products.storeId], references: [stores.id] })
// }))

// export const carts = mysqlTable('carts', {
//   id: int('id').primaryKey().autoincrement(),
//   userId: varchar('userId', { length: 191 }),
//   paymentIntentId: varchar('paymentIntentId', { length: 191 }),
//   clientSecret: varchar('clientSecret', { length: 191 }),
//   items: json('items').$type().default(null),
//   createdAt: timestamp('createdAt').defaultNow()
// })
