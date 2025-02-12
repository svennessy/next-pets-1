import { getOwner } from "@/lib/queries/getOwner"
import { getPet } from "@/lib/queries/getPet"
import { BackButton } from "@/components/BackButton"

export default async function petFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { ownerId, petId } = await searchParams

    if (!ownerId && !petId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            pet ID or owner ID required to load pet form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      )
    }

    // New pet form
    if (ownerId) {
      const owner = await getOwner(parseInt(ownerId))

      if (!owner) {
        return (
          <>
            <h2 className="text-2xl mb-2">owner ID #{ownerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      if (!owner.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              owner ID #{ownerId} is not active.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      // return pet form
      console.log(owner)
    }

    // Edit pet form
    if (petId) {
      const pet = await getPet(parseInt(petId))

      if (!pet) {
        return (
          <>
            <h2 className="text-2xl mb-2">pet ID #{petId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      const owner = await getOwner(pet.ownerId)

      // return pet form
      console.log("pet: ", pet)
      console.log("owner: ", owner)
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
  }
}
