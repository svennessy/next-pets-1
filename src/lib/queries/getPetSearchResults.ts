import { db } from "@/db"
import { owners, pets } from "@/db/schema"
import { eq, ilike, or, sql, asc } from "drizzle-orm"

export async function getPetSearchResults(searchText: string) {
  const results = await db
    .select({
      id: pets.id,
      petCreatedDate: pets.createdAt,
      petName: pets.petName,
      firstName: owners.firstName,
      lastName: owners.lastName,
      email: owners.email,
      stillMissing: pets.stillMissing,
    })
    .from(pets)
    .leftJoin(owners, eq(pets.ownerId, owners.id))
    .where(
      or(
        ilike(pets.petName, `%${searchText}%`),
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
    .orderBy(asc(pets.createdAt))

  return results
}

export type PetSearchResultsType = Awaited<
  ReturnType<typeof getPetSearchResults>
>
