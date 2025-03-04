import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "@/components/SearchButton"

export default function PetSearch() {
  return (
    <Form action="/pets" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Pets"
        className="w-full"
      />
      <SearchButton />
    </Form>
  )
}
