import { getOwner } from "@/lib/queries/getOwner"
import { BackButton } from "@/components/BackButton"
import OwnerForm from "./OwnerForm"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { ownerId } = await searchParams

  if (!ownerId) return { title: "New Owner" }

  return { title: `Edit Owner #${ownerId}` }
}

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
      // put owner form component
      // aka editing owner data
      return <OwnerForm owner={owner} />
    } else {
      // new owner form component
      // aka creating a new owner
      return <OwnerForm />
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
  }
}
