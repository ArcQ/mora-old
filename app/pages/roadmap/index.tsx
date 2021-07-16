import TitleNavLayout from "../../core/layouts/TitleNavLayout"

const timelineData = [
  {
    text: "Wrote my first blog post ever on Medium",
    date: "March 03 2017",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "Read more",
    },
  },
  {
    text: "Wrote my first blog post ever on Medium",
    date: "March 03 2017",
    highlight: "true",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "Read more",
    },
  },
  {
    text: "Wrote my first blog post ever on Medium",
    date: "March 03 2017",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
      text: "Read more",
    },
  },
]

const TimelineItem = ({ data, idx }) => (
  <div
    className={`mb-8 justify-between flex items-center w-full ${
      idx % 2 == 0 ? "flex-row-reverse left-timeline" : "right-timeline"
    }`}
  >
    <div className="order-1 w-5/12"></div>
    <div className="z-20 flex items-center order-1 bg-gray-800 w-8 h-8 rounded-full">
      <h1 className="mx-auto font-semibold text-lg text-white">{idx + 1}</h1>
    </div>
    {data.highlight ? (
      <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-white text-xl">{data.title}</h3>
        <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
          {data.text}
        </p>
        <h5 className="my-3 font-bold text-white text-l">Target Date</h5>
        <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
          {data.text}
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
          {data.text}
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
  return <Timeline />
}

Roadmap.suppressFirstRenderFlicker = true
Roadmap.getLayout = (page) => (
  <TitleNavLayout
    displayTitle="Roadmap"
    displayDescription="We're still in early alpha. What you see is only a small peak into our ultimate vision. Stay tuned and stay involved, we're working hard to listen to all your feedback!"
  >
    {page}
  </TitleNavLayout>
)

export default Roadmap
