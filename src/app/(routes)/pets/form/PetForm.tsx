"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import {
  insertPetSchema,
  type insertPetSchemaType,
  type selectPetSchemaType,
} from "@/zod-schemas/pet"
import { selectOwnerSchemaType } from "@/zod-schemas/owner"

type Props = {
  owner: selectOwnerSchemaType
  pet?: selectPetSchemaType
}

export default function PetForm({ owner, pet }: Props) {
  const defaultValues: insertPetSchemaType = {
    id: pet?.id ?? "(New)",
    ownerId: pet?.ownerId ?? owner.id,
    petName: pet?.petName ?? "",
    lastSeen: pet?.lastSeen ?? "",
    /* createdAt: pet?.createdAt ?? "",
    updatedAt: pet?.updatedAt ?? "", */
    stillMissing: pet?.stillMissing ?? true,
    description: pet?.description ?? "",
  }

  const form = useForm<insertPetSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertPetSchema),
    defaultValues,
  })

  async function submitForm(data: insertPetSchemaType) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {pet?.id ? "Edit" : "New"} Pet {pet?.id ? `# ${pet.id}` : 'Form'}
        </h2>
      </div>

      {/* Form is from shadcn, ...form is custom value utilizing rhf useForm */}
      <Form {...form}>
        {/* Typical html form element */}
        <form
          // form.handleSubmit is typical html
          // submitForm is our custom async function
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          {/* <div className="flex flex-col gap-4 w-full max-w-xs"></div> */}

          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  )
}
