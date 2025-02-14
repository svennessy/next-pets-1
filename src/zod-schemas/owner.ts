import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { owners } from "@/db/schema"

// will throw type errors if drizzle-zod is updated past 0.5.1 as of 2/12

export const insertOwnerSchema = createInsertSchema(owners, {
  firstName: (schema) => schema.firstName.min(1, "First name is required"),
  lastName: (schema) => schema.lastName.min(1, "Last name is required"),
  address1: (schema) => schema.address1.min(1, "Address is required"),
  city: (schema) => schema.city.min(1, "City is required"),
  state: (schema) =>
    schema.state.length(2, "State must be exactly 2 characters"),
  email: (schema) => schema.email.email("Invalid email address"),
  zip: (schema) =>
    schema.zip.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
    ),
  phone: (schema) =>
    schema.phone.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Use XXX-XXX-XXXX"
    ),
})

export const selectOwnerSchema = createSelectSchema(owners)

export type insertOwnerSchemaType = typeof insertOwnerSchema._type

export type selectOwnerSchemaType = typeof selectOwnerSchema._type
