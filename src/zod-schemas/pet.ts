import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { pets } from "@/db/schema"
import { z } from "zod"

// Refine input fields before submission
export const insertPetSchema = createInsertSchema(pets, {
  // z.union composes "OR" types
  // ie; id.parse("foo") passes
  // and id.parse(14) passes
  id: z.union([z.number(), z.literal("(New)")]),

  // all .mins checking if there has been at least one character provided
  petName: (schema) => schema.petName.min(1, "Pet name is required"),
  description: (schema) => schema.description.min(1, "Description is required"),

  // https://zod.dev/?id=dates-1
  lastSeen: (schema) => schema.lastSeen.date(),
})

// get data from @/db/schema
export const selectPetSchema = createSelectSchema(pets)

// get type from zod schema
export type insertPetSchemaType = typeof insertPetSchema._type

export type selectPetSchemaType = typeof selectPetSchema._type
