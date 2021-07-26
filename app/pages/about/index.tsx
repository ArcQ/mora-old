import TitleNavLayout from "../../core/layouts/TitleNavLayout"

type Link = {
  url: string
  text: string
}

type TimelineData = {
  title: string
  text: string
  targetDate: string
  highlight?: boolean
  link?: Link
}

const timelineData: Array<TimelineData> = [
  {
    title: "Alpha.v0 Pre Launch",
    text: "Test the market with basic mora profile and our direct carbon capture program.",
    targetDate: "Oct 10 2021",
    highlight: "true",
  },
  {
    title: "Introduce gamification and share features",
    text: "Mora should be fun and easy to show off, it's not gonna work if you can't get other people to join you on your cause",
    targetDate: "Nov 10 2021",
  },
  {
    title: "Auto Contribution System",
    text: "Saving the world doesn't have to be a full time job. Mora wants to at least partially be invisible, finding ways for you to contribute through actions you already do.",
    targetDate: "Dec 10 2021",
  },
  {
    title: "Alpha.v1 - Streaks",
    text: "Streak and badges",
    targetDate: "Feb 10 2022",
    highlight: "true",
  },
  {
    title: "Api-fication",
    text: "This isn't gonna work if we build it alone. Our plan is to open up Mora as a service so any company, conglomerate or your local mom & pop store has access.",
    targetDate: "TBD",
  },
  {
    title: "Touchbase",
    text: "In house consumer of mora api, details coming soon",
    targetDate: "TBD",
    highlight: "true",
  },
]

type TimelineItemProps = {
  data: TimelineData
  idx: number
}

const TimelineItem = ({ data, idx }: TimelineItemProps) => (
  <div
    className={`mb-8 justify-between flex items-center w-full ${
      idx % 2 == 0 ? "flex-row-reverse left-timeline" : "right-timeline"
    }`}
  >
    <div className="order-1 w-5/12"></div>
    <div className="z-20 flex items-center order-1 bg-green-400 w-8 h-8 rounded-full">
      <h1 className="mx-auto font-semibold text-lg text-white">{idx + 1}</h1>
    </div>
    {data.highlight ? (
      <div className="bg-gradient-to-r from-green-400 to-blue-500 order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-white text-xl">{data.title}</h3>
        <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
          {data.text}
        </p>
        <h5 className="my-3 font-bold text-white text-l">Target Date</h5>
        <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
          {data.targetDate}
        </p>
      </div>
    ) : (
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-gray-800 text-xl">{data.title}</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
          {data.text}
        </p>
        <h5 className="my-3 font-bold text-gray-800 text-l">Target Date</h5>
        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
          {data.targetDate}
        </p>
      </div>
    )}
  </div>
)

const Timeline = () => (
  <>
    {timelineData.length > 0 && (
      <div className="container mx-auto w-full h-full my-5">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
            style={{ left: "50%" }}
          ></div>
          {timelineData.map((data, idx) => (
            <TimelineItem data={data} idx={idx} key={`timeline-item-${idx}`} />
          ))}
        </div>
      </div>
    )}

    <style jsx>{``}</style>
  </>
)

const Roadmap = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 my-5 rounded-lg p-5">
        <span className="text-white">
          <span className="font-bold">The Mora Mission:</span> Promote high impact planet saving
          initiatives, while democratizing the underlying technology so everyone has equal access.
        </span>
      </div>
      <Timeline />
    </>
  )
}

Roadmap.suppressFirstRenderFlicker = false
Roadmap.getLayout = (page) => (
  <TitleNavLayout
    displayTitle="Roadmap"
    displayDescription="We're still in early alpha! What you see is only a small peak into our ultimate vision. Stay tuned and stay involved, we're working hard to listen to all your feedback!"
  >
    {page}
  </TitleNavLayout>
)

export default Roadmap
