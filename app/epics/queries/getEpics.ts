import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetEpicsInput
  extends Pick<Prisma.EpicFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetEpicsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: epics,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.epic.count({ where }),
      query: (paginateArgs) => db.epic.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      epics,
      nextPage,
      hasMore,
      count,
    }
  }
)
