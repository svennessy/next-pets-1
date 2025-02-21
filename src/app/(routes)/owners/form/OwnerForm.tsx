"use client"

// https://react-hook-form.com/docs/useform
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

// shadcn
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InputWithLabel } from "@/components/inputs/InputWithLabel"

import {
  insertOwnerSchema,
  type insertOwnerSchemaType,
  type selectOwnerSchemaType,
} from "@/zod-schemas/owner"

// Props is name of type we're creating
type Props = {
  // an owner could possibly be passed in
  // data would come from selectOwnerSchemaType
  owner?: selectOwnerSchemaType
}

// will possibly receive owner data props
export default function OwnerForm({ owner }: Props) {
  // form that creates initial owner data
  // if values exists will return it
  // otherwise blank
  const defaultValues: insertOwnerSchemaType = {
    id: owner?.id ?? 0,
    firstName: owner?.firstName ?? "",
    lastName: owner?.lastName ?? "",
    address1: owner?.address1 ?? "",
    address2: owner?.address2 ?? "",
    city: owner?.city ?? "",
    state: owner?.state ?? "",
    zip: owner?.zip ?? "",
    phone: owner?.phone ?? "",
    email: owner?.email ?? "",
    notes: owner?.notes ?? "",
  }

  // useForm type is <insertOwnerSchemaType>
  const form = useForm<insertOwnerSchemaType>({
    // if there is incorrect data in field error will show upon tabbing
    mode: "onBlur",
    resolver: zodResolver(insertOwnerSchema),
    defaultValues,
  })

  async function submitForm(data: insertOwnerSchemaType) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {owner?.id ? "Edit" : "New"} Owner Form
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
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />
          </div>

          {/* <p>{JSON.stringify(form.getValues())}</p> */}
        </form>
      </Form>
    </div>
  )
}
