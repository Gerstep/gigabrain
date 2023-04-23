// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-console */
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import { useDispatch } from "react-redux";

import UnderlineLink from "@/components/links/UnderlineLink";

import { setClassType, setContext, setPerson, setProgress, setTask } from "@/store/subjectSlice";

import { subjects } from '@/utils/topics';


const CourseOverview = ({ subjectId, agent, killAgent }) => {
  const dispatch = useDispatch();

  const handleSetProgress = (topicTitle: string, topicType: string) => {
    dispatch(setProgress({ topicTitle: topicTitle }));
    dispatch(setContext({ contextData: 'reset' }));
    dispatch(setClassType({ classType: topicType }))
  };

  const handleSetPerson = (topicPerson: string) => {
    dispatch(setPerson({ topicPerson: topicPerson }));
  };

  const handleSetTask = (topicTask: string) => {
    dispatch(setTask({ topicTask: topicTask }));
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
                      killAgent();
                      handleSetProgress(topic.title, topic.type)
                      if (topic.person) { handleSetPerson(topic.person) }
                      if (topic.task) { handleSetTask(topic.task) }
                    }} >
                    {topic.title} &nbsp; <HiArrowRight />
                  </UnderlineLink>
                  <div className={`rounded-lg h-fit mt-2 text-center opacity-70 hover:opacity-100 w-fit px-2 ${getTopicType(topic.type)}`}>
                    {topic.type} {topic.type === 'discussion' && (
                      <span>with {topic.person}</span>
                    )}
                  </div>
                </div>
              ))}
            </>
          ))}
          <div className="text-xl font-semibold py-7">
            <span className="pl-24">Congrats!</span>

            <Image src='/images/chest2.png' alt='' width={300} height={300} />
          </div>
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
      return "bg-violet-300";
    case "discussion":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
}

export { CourseOverview }