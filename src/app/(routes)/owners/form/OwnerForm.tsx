"use client"

// https://react-hook-form.com/docs/useform
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

// shadcn
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

import { StatesArray } from "@/constants/StatesArray"

import {
  insertOwnerSchema,
  type insertOwnerSchemaType,
  type selectOwnerSchemaType,
} from "@/zod-schemas/owner"

import { useAction } from "next-safe-action/hooks"
import { saveOwnerAction } from "@/app/actions/saveOwnerAction"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

// Props is name of type we're creating
type Props = {
  // an owner could possibly be passed in
  // data would come from selectOwnerSchemaType
  owner?: selectOwnerSchemaType
}

// will possibly receive owner data props
export default function OwnerForm({ owner }: Props) {
  const { getPermission, isLoading } = useKindeBrowserClient()
  const isOwner = !isLoading && getPermission("owner")?.isGranted

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

  // named variables in case need to use action again
  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveOwnerAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast("Success!", {
          description: data?.message,
        })
      }
    },
    onError({ error }) {
      toast("Error", {
        description: "Save Failed",
      })
    },
  })

  async function submitForm(data: insertOwnerSchemaType) {
    console.log(data)
    executeSave(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {owner?.id ? "Edit" : "New"} Owner{" "}
          {owner?.id ? `#${owner.id}` : "Form"}
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
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />
            <TextAreaWithLabel<insertOwnerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />

            {/* {isLoading ? <p>Loading...</p> : isOwner ? (
              <CheckboxWithLabel<insertOwnerSchemaType>
              fieldTitle="stillMissing"
              nameInSchema="stillMissing"
              message="Yes"
              />
            ) : null} */}
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="Address"
              nameInSchema="address1"
            />
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="Apartment #"
              nameInSchema="address2"
            />
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />
            <SelectWithLabel<insertOwnerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
            <InputWithLabel<insertOwnerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>

              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues)
                  resetSaveAction()
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* <p>{JSON.stringify(form.getValues())}</p> */}
        </form>
      </Form>
    </div>
  )
}
