import { getOwner } from "@/lib/queries/getOwner"
import { getPet } from "@/lib/queries/getPet"
import { BackButton } from "@/components/BackButton"
import PetForm from "./PetForm"

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
            Pet ID or Owner ID required to load pet form
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
            <h2 className="text-2xl mb-2">Owner ID #{ownerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      if (!owner.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Owner ID #{ownerId} is not active.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      // return pet form
      console.log(owner)
      return <PetForm owner={owner} />
    }

    // Edit pet form
    if (petId) {
      const pet = await getPet(parseInt(petId))

      if (!pet) {
        return (
          <>
            <h2 className="text-2xl mb-2">Pet ID #{petId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      const owner = await getOwner(pet.ownerId)

      // return pet form
      console.log("pet: ", pet)
      console.log("owner: ", owner)
      return <PetForm owner={owner} pet={pet} />
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
  }
}
