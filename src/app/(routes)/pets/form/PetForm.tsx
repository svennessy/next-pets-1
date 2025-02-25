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

import {
  insertPetSchema,
  type insertPetSchemaType,
  type selectPetSchemaType,
} from "@/zod-schemas/pet"
import { selectOwnerSchemaType } from "@/zod-schemas/owner"

import { useAction } from "next-safe-action/hooks"
import { savePetAction } from "@/app/actions/savePetAction"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

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

  // named variables in case need to use action again
  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(savePetAction, {
    onSuccess({ data }) {
      toast("Success!", {
        description: data?.message,
      })
    },
    onError({ error }) {
      toast("Error", {
        description: "Save Failed",
      })
    },
  })

  async function submitForm(data: insertPetSchemaType) {
    console.log(data)
    executeSave(data)
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {pet?.id ? "Edit" : "New"} Pet {pet?.id ? `# ${pet.id}` : "Form"}
        </h2>
      </div>

      {/* Form is from shadcn, ...form is custom value utilizing rhf useForm */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertPetSchemaType>
              fieldTitle="Pet Name"
              nameInSchema="petName"
            />

            <InputWithLabel<insertPetSchemaType>
              fieldTitle="Owner ID"
              nameInSchema="ownerId"
              disabled={true}
            />

            <InputWithLabel<insertPetSchemaType>
              fieldTitle="Last Seen"
              nameInSchema="lastSeen"
            />

            <CheckboxWithLabel<insertPetSchemaType>
              fieldTitle="Still Missing"
              nameInSchema="stillMissing"
              message="Yes"
            />

            <div className="mt-4 space-y-6">
              <h3 className="text-lg">Owner Info</h3>
              <hr className="w-4/5" />
              <p>
                {owner.firstName} {owner.lastName}
              </p>
              <p>{owner.address1}</p>
              {owner.address2 ? <p>{owner.address2}</p> : null}
              <p>
                {owner.city}, {owner.state} {owner.zip}
              </p>
              <hr className="w-4/5" />
              <p>{owner.email}</p>
              <p>Phone: {owner.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<insertPetSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
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
        </form>
      </Form>
    </div>
  )
}

{
  /*<p>{JSON.stringify(form.getValues())}</p>*/
}
