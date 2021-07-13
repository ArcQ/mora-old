import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateDream = z.object({
  name: z.string(),
  userId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateDream), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const dream = await db.dream.create({ data: input })

  return dream
})
