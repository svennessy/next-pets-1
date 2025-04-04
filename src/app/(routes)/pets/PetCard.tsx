"use client"

import type { PetSearchResultsType } from "@/lib/queries/getPetSearchResults"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

/* type Props = {
  petName: string
  species: string
  ownerName: string
  pictures: [string]
  lastSeenDate: Date
  lastSeenLocation: Location
  lastCheckedOn: Date
  contact: string
  info: string
} */

type Props = {
  data: PetSearchResultsType
}

type ValueType = PetSearchResultsType[0]

/* petName,
  species,
  ownerName,
  pictures,
  lastSeenDate,
  lastSeenLocation,
  lastCheckedOn,
  contact,
  info, 
*/

export default function PetCard({ data }: Props) {
  const router = useRouter()

  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}
      {data.map((values) => (
        <div key={values.id} className="w-96 h-96 flex flex-col p-1 rounded-xl bg-red-400">
          <div className="flex justify-center overflow-hidden w-full max-h-80">
            <Image
              className="m-0 flex rounded-xl"
              width={300}
              height={300}
              src="/images/MaxineOne.png"
              alt={values.id.toString()}
            />
          </div>
          {values.petName}
        </div>
      ))}
    </>
  )
}
