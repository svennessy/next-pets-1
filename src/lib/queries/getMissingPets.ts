import { db } from "@/db";
import {pets, owners} from "@/db/schema"
import { eq, asc } from "drizzle-orm";

export async function getMissingPets() {
    const results = await db.select({
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
    .where(eq(pets.stillMissing, true))
    .orderBy(asc(pets.createdAt))

    return results
}