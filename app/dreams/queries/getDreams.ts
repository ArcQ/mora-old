import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetDreamsInput
  extends Pick<Prisma.DreamFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetDreamsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: dreams,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.dream.count({ where }),
      query: (paginateArgs) => db.dream.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      dreams,
      nextPage,
      hasMore,
      count,
    }
  }
)
