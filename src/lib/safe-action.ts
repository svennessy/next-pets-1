import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"

// https://next-safe-action.dev/

export const actionClient = createSafeActionClient({
  // defines specific action names and allows action specific errors
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  },
  // gives all info regarding error
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils
    // error example that shows in ui
    if (e.constructor.name === "NeonDbError") {
      return "Database Error: Your data did not save. Support will be notified."
    }
    return e.message
  },
})
