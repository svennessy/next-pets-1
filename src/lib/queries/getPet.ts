import { db } from "@/db"
import { pets } from "@/db/schema"
import { eq } from "drizzle-orm"

// eq means equals

export async function getPet(id: number) {
  const pet = await db.select().from(pets).where(eq(pets.id, id))

  return pet[0]
}
