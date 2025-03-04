import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "@/components/SearchButton"

export default function OwnerSearch() {
  return (
    <Form action="/owners" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Owners"
        className="w-full"
      />
      <SearchButton />
    </Form>
  )
}
