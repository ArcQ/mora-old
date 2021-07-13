import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteEpic = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteEpic), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const epic = await db.epic.deleteMany({ where: { id } })

  return epic
})
