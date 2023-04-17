// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-console */
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import type Message from '@/components/Agent'
import Agent from '@/components/Agent';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Messages from '@/components/Messages';
import Seo from '@/components/Seo';
import Study from '@/components/Study';
import TopMenu from '@/components/TopMenu';

import { RootState } from '@/store/store';
import { setProgress } from '@/store/subjectSlice';

import { subjects } from '@/utils/topics';

const initialMessage = {
  type: "action",
  value: "Choose your action",
  actions: [
    "Start"
  ]
};


export default function Learn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { subjectId, subjectName, proficiency, topic } = useSelector((state: RootState) => state.subject);
  const progress = useSelector((state: RootState) => state.subject.progress);
  const [agent, setAgent] = React.useState<Agent | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const currentTopic = progress.length > 0 ? progress[progress.length - 1].topic : "No topic";

  const handleSetProgress = (topicName: string) => {
    dispatch(setProgress({ topic: topicName }));
  };

  const handleReSetProgress = () => {
    dispatch(setProgress({ topic: "No topic" }));
  };

  useEffect(() => {
    if (!messages || messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [messages]);

  useEffect(() => {
    if (!subjectId || !proficiency) {
      router.push('/');
    }
  }, [subjectId, proficiency, router]);

  const callAgent = (action : string) => {
    console.log('ACTION ::: ' + action)
    const agent = new Agent(
      subjectName, 
      proficiency, 
      currentTopic, 
      action,
      handleAddMessage);
    setAgent(agent);
    agent.run();
  }

  const handleAddMessage = (message : Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <Layout>
    {/* <Seo templateTitle='Home' /> */}
    <Seo />
    <main>
      <section className='bg-white'>
        <div className="bg-gray-200 text-black px-4 py-2 flex justify-between items-center">
          <div className='ml-7'>
            <span className="mr-2 font-bold font-mon"><TopMenu /></span>
          </div>
          <div className='ml-7'>
            <span className="mr-2 font-bold font-mon">Subject:</span>
            <span className='block'>
              <Link href="" onClick={() => handleReSetProgress()} className='underline'>
                {subjectName}
              </Link>
            </span>
          </div>
          <div>
            <p className="mr-2 font-bold font-mon">Proficiency:</p>
            <p className='block'>{proficiency}</p>
          </div>
          <div className='mr-7'>
            <p className="mr-2 font-bold font-mon">Current Topic:</p>
            <p className='block'>{currentTopic}</p>
          </div>
        </div>
        <div className='layout w-full relative flex flex-col items-center justify-center py-12 text-center'>
          {subjectId && currentTopic==="No topic" && (
            <ShowTopics subjectId={subjectId} />
          )}
          {currentTopic!="No topic" && (
            <Study>
              <Messages messages={messages} callAgent={callAgent} agent={agent} />
            </Study>
          )}
          {agent && (
            <div className="flex flex-wrap pt-2">
            <Button onClick={() => agent.run()}  className="mx-5 px-3 h-10 text-xs">Learn more topics</Button>
            <Button onClick={() => {
              const answerMessages = messages.filter(message => message.type === "answer");
              const testSubject = answerMessages.length > 0
                ? answerMessages.map(message => message.value).join(". ")
                : `${subjectName}${proficiency}${currentTopic}`;
              agent.test(testSubject);
            }} className="mx-5 px-3 h-10 text-xs">Test myself</Button>
            </div>
          )}
        </div>
      </section>
    </main>
    </Layout>
  );
};

const ShowTopics = ({subjectId}) => {
  const progress = useSelector((state: RootState) => state.subject.progress);
  const dispatch = useDispatch();

  const handleSetProgress = (topicName: string) => {
    dispatch(setProgress({ topic: topicName }));
  };

  return(
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome! To start, choose a topic:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {subjects.find(subject => subject.id === subjectId).categories.map((category, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">{category.category}</h2>
            <div className="list-disc list-inside text-left">
              {category.topics.map((topic, index) => (
                <div className="pt-1" key={index}>
                  <UnderlineLink href="" onClick={() => handleSetProgress(topic)}>
                  {topic}
                  </UnderlineLink>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ShowTopics }