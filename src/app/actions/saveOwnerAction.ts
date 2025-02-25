"use server"

// https://next-safe-action.dev/

import { eq, sql } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
// redirect if not logged in
import { redirect } from "next/navigation"

import { db } from "@/db"
import { owners } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import {
  insertOwnerSchema,
  type insertOwnerSchemaType,
} from "@/zod-schemas/owner"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { error } from "console"

// eliminates need for try catch because actionClient does so for us

export const saveOwnerAction = actionClient
  // defined in safe-action file
  .metadata({ actionName: "saveOwnerAction" })
  // data already validated on client side; this is for server
  .schema(insertOwnerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({ parsedInput: owner }: { parsedInput: insertOwnerSchemaType }) => {
      const { isAuthenticated } = getKindeServerSession()

      const isAuth = await isAuthenticated()

      if (!isAuth) redirect("/login")

      /* const query = sql.raw("SELECT * FROM ")
      const data = await db.execute(query) */

      // New owner
      if (owner.id === 0) {
        const result = await db
          .insert(owners)
          .values({
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            phone: owner.phone,
            address1: owner.address1,
            // spread for optional fields
            ...(owner.address2?.trim() ? { address2: owner.address2 } : {}),
            city: owner.city,
            state: owner.state,
            zip: owner.zip,
            ...(owner.notes?.trim() ? { notes: owner.notes } : {}),
          })
          .returning({ insertId: owners.id })

        return {
          message: `Owner ID #${result[0].insertId} created successfully`,
        }
      }

      // Existing owner
      const result = await db
        .update(owners)
        .set({
          firstName: owner.firstName,
          lastName: owner.lastName,
          email: owner.email,
          phone: owner.phone,
          address1: owner.address1,
          address2: owner.address2?.trim() ?? null,
          city: owner.city,
          state: owner.state,
          zip: owner.zip,
          notes: owner.notes?.trim() ?? null,
        })
        .where(eq(owners.id, owner.id!))
        .returning({ updatedId: owners.id })

      return {
        message: `Owner ID #${result[0].updatedId} updated successfully`,
      }
    }
  )
