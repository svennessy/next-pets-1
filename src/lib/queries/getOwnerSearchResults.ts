import { db } from "@/db"
import { owners } from "@/db/schema"
import { ilike, or, sql } from "drizzle-orm"

export async function getOwnerSearchResults(searchText: string) {
  const results = await db
    .select()
    .from(owners)
    .where(
      or(
        ilike(owners.firstName, `%${searchText}%`),
        ilike(owners.lastName, `%${searchText}%`),
        ilike(owners.email, `%${searchText}%`),
        ilike(owners.phone, `%${searchText}%`),
        //ilike(owners.address1, `%${searchText}%`),
        //ilike(owners.address2, `%${searchText}%`),
        ilike(owners.city, `%${searchText}%`),
        //ilike(owners.state, `%${searchText}%`),
        ilike(owners.zip, `%${searchText}%`),
        //ilike(owners.notes, `%${searchText}%`)

        // allow users to search first and last name together
        sql`lower(concat(${owners.firstName}, ' ', ${
          owners.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}`}`
      )
    )
  return results
}
