// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-console */
import { HiArrowRight } from "react-icons/hi";
import { useDispatch } from "react-redux";

import UnderlineLink from "@/components/links/UnderlineLink";

import { setClassType, setContext, setProgress } from "@/store/subjectSlice";

import { subjects } from '@/utils/topics';


const CourseOverview = ({ subjectId, agent, setMessages }) => {
  const dispatch = useDispatch();

  const handleSetProgress = (topicTitle: string, topicType: string) => {
    dispatch(setProgress({ topicTitle: topicTitle }));
    dispatch(setContext({ contextData: 'reset' }));
    dispatch(setClassType({ classType: topicType }))
  };

  return (
    <div className="layout w-full py-4 relative">
      <div className="text-2xl font-bold text-center mb-2 mt-4">Explore the course</div>
      <div className="wrapper">
        <div className="step-progress">
          {subjects.find(subject => subject.id === subjectId).categories.map((category, index) => (
            <>
              <div className="text-xl font-semibold py-10" key={index}>{category.category}</div>
              {category.topics.map((topic, index) => (
                <div className="step-progress-item" key={index}>
                  <UnderlineLink href="" className="font-bold" onClick={
                    () => {
                      if (agent) {
                        killAgent();

                      }
                      handleSetProgress(topic.title, topic.type)
                    }} >
                    {topic.title} &nbsp; <HiArrowRight />
                  </UnderlineLink>
                  <div className={`rounded-lg h-6 mt-2 text-center opacity-70 hover:opacity-100 w-20 ${getTopicType(topic.type)}`}>{topic.type}</div>
                </div>
              ))}
            </>
          ))}
        </div>
      </div >
    </div >
  )
}

const getTopicType = (type: string) => {
  switch (type) {
    case "seminar":
      return "bg-amber-300";
    case "lecture":
      return "bg-blue-300";
    case "laboratory":
      return "bg-red-300";
    default:
      return "bg-violet-400";
  }
}

export { CourseOverview }