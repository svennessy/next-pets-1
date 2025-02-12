import { db } from "@/db"
import { owners } from "@/db/schema"
import { eq } from "drizzle-orm"

// eq means equals

export async function getOwner(id: number) {
  const owner = await db.select().from(owners).where(eq(owners.id, id))

  return owner[0]
}
