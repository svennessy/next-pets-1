"use server"

// https://next-safe-action.dev/

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
// redirect if not logged in
import { redirect } from "next/navigation"

import { db } from "@/db"
import { pets } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import { insertPetSchema, type insertPetSchemaType } from "@/zod-schemas/pet"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { error } from "console"

// eliminates need for try catch because actionClient does so for us

export const savePetAction = actionClient
  // defined in safe-action file
  .metadata({ actionName: "savePetAction" })
  // data already validated on client side; this is for server
  .schema(insertPetSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({ parsedInput: pet }: { parsedInput: insertPetSchemaType }) => {
      const { isAuthenticated } = getKindeServerSession()

      const isAuth = await isAuthenticated()

      if (!isAuth) redirect("/login")

      // New Pet
      if (pet.id === "(New)") {
        const result = await db
          .insert(pets)
          .values({
            ownerId: pet.ownerId,
            petName: pet.petName,
            description: pet.description,
            lastSeen: pet.lastSeen,
            stillMissing: pet.stillMissing,
          })
          .returning({ insertedId: pets.id })

        return {
          message: `Pet ID #${result[0].insertedId} created successfully!`,
        }
      }

      // Update Pet
      const result = await db
        .update(pets)
        .set({
          ownerId: pet.ownerId,
          petName: pet.petName,
          description: pet.description,
          lastSeen: pet.lastSeen,
          stillMissing: pet.stillMissing,
        })
        .where(eq(pets.id, pet.id!))
        .returning({ updatedId: pets.id })

      return { message: `Pet ID #${result[0].updatedId} updated successfully!` }
    }
  )
