import { getOwner } from "@/lib/queries/getOwner"
import { getPet } from "@/lib/queries/getPet"
import { BackButton } from "@/components/BackButton"
import PetForm from "./PetForm"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Users, init as kindeInit } from "@kinde/management-api-js"

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

    const { getPermission, getUser } = getKindeServerSession()
    const [ownerPermission, user] = await Promise.all([
      getPermission("owner"),
      getUser(),
    ])

    const isOwner = ownerPermission?.isGranted

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
      if (isOwner) {
        kindeInit()
        const { users } = await Users.getUsers()

        const owners = users
          ? users.map((user) => ({ id: user.email, description: user.email }))
          : []

        return <PetForm owner={owner} />
      } else {
        return <PetForm owner={owner} />
      }
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

      // meant for different user permissions
      if (isOwner) {
        kindeInit()
        const { users } = await Users.getUsers()

        const owners = users
          ? users.map((user) => ({
              id: user.email,
              description: user.email,
            }))
          : []
          
          return <PetForm owner={owner} pet={pet} />
      } else {
        return <PetForm owner={owner} pet={pet} />
      }
    }

  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
  }
}
