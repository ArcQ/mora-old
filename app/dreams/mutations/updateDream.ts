import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateDream = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateDream),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const dream = await db.dream.update({ where: { id }, data })

    return dream
  }
)
