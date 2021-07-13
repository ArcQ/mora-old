import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetDream = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetDream), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const dream = await db.dream.findFirst({ where: { id } })

  if (!dream) throw new NotFoundError()

  return dream
})
