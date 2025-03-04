import OwnerSearch from "@/app/(routes)/owners/OwnerSearch"
import { getOwnerSearchResults } from "@/lib/queries/getOwnerSearchResults"
import OwnerTable from "./OwnerTable"

export const metadata = {
  title: "Owner Search",
}

export default async function Owners({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { searchText } = await searchParams

  if (!searchText) return <OwnerSearch />

  // query database
  const results = await getOwnerSearchResults(searchText)

  // return results
  return (
    <>
      <OwnerSearch />
      {results.length ? (
        <OwnerTable data={results} />
      ) : (
        <p className="mt-4">No owners found</p>
      )}
    </>
  )
}
