import { getOwner } from "@/lib/queries/getOwner"
import { BackButton } from "@/components/BackButton"
import OwnerForm from "./OwnerForm"

export default async function ownerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { ownerId } = await searchParams

    // Edit owner form
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
      console.log(owner)
      return <OwnerForm owner={owner} />
      // put owner form component
    } else {
      // new owner form component
      return <OwnerForm />
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
  }
}
