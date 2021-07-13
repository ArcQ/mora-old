import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateEpic = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateEpic),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const epic = await db.epic.update({ where: { id }, data })

    return epic
  }
)
