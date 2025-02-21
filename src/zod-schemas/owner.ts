import { createInsertSchema, createSelectSchema } from "drizzle-zod"
// drizzle zod allows you to generate zod schemas from drizzle orm schemas

import { owners } from "@/db/schema"

// will throw type errors if drizzle-zod is updated past 0.5.1 as of 2/12

// Refine input fields before submission
export const insertOwnerSchema = createInsertSchema(owners, {
  // all .mins checking if there has been at least one character provided
  firstName: (schema) => schema.firstName.min(1, "First name is required"),
  lastName: (schema) => schema.lastName.min(1, "Last name is required"),
  address1: (schema) => schema.address1.min(1, "Address is required"),
  city: (schema) => schema.city.min(1, "City is required"),

  // .length checking if the input is exactly two characters
  state: (schema) =>
    schema.state.length(2, "State must be exactly 2 characters"),

  // .email is a built in function to verify if an email is valid
  email: (schema) => schema.email.email("Invalid email address"),

  // regex for us zip code breakdown
  // ^ asserts current position is start of input
  // \d a digit (0-9)
  // {5} that repeats five times
  // () around (-\d{4}) groups segment together
  // - represents hyphen of a 9-digit zip code like 93930-5407
  // \d{4} any four numbers
  // ? means (-\d{4}) segment is optional
  // $ asserts current position is end of input
  zip: (schema) =>
    schema.zip.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
    ),

  // \d{3} any 3 numbers
  // - physical hyphen in between
  phone: (schema) =>
    schema.phone.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Use XXX-XXX-XXXX"
    ),
})

// get data from @/db/schema
export const selectOwnerSchema = createSelectSchema(owners)

// get type from zod schema
export type insertOwnerSchemaType = typeof insertOwnerSchema._type

export type selectOwnerSchemaType = typeof selectOwnerSchema._type
