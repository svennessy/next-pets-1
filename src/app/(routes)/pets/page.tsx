import PetSearch from "@/app/(routes)/pets/PetSearch"
import { getMissingPets } from "@/lib/queries/getMissingPets"
import { getPetSearchResults } from "@/lib/queries/getPetSearchResults"
import PetTable from "./PetTable"

export const metadata = {
  title: "Pet Search",
}

export default async function Pets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { searchText } = await searchParams

  if (!searchText) {
    const results = await getMissingPets()
    return (
      <>
        <PetSearch />
        {results.length ? (
          <PetTable data={results} />
        ) : (
          <p className="mt-4">No missing pets!</p>
        )}
      </>
    )
  }

  // query database
  const results = await getPetSearchResults(searchText)

  // return results
  return (
    <>
      <PetSearch />
      {results.length ? (
        <PetTable data={results} />
      ) : (
        <p className="mt-4">No results found</p>
      )}
    </>
  )
}
