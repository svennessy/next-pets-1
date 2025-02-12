import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// table for all owners
export const owners = pgTable("owners", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
  address1: varchar("address1").notNull(),
  address2: varchar("address2"),
  city: varchar("city").notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// table for all pets
export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => owners.id),
  petName: varchar("petName").notNull(),
  description: text("description"),
  stillMissing: boolean("stillMissing").notNull().default(true),
  lastSeen: varchar("lastSeen").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Create relations

// Owner may have many pets
export const ownersRelations = relations(owners, ({ many }) => ({
  pets: many(pets),
}))

// pets can only have one owner
export const petsRelations = relations(pets, ({ one }) => ({
  // references owner in owners table
  owner: one(owners, {
    // filter by id char
    fields: [pets.ownerId],
    // said char will be this
    references: [owners.id],
  }),
}))
