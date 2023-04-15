/* eslint-disable no-console */
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
import Window from '@/components/Messages';
import Seo from '@/components/Seo';
import Study from '@/components/Study';
import TopMenu from '@/components/TopMenu';

import { RootState } from '@/store/store';
import { setProgress } from '@/store/subjectSlice';

import { blockchainTopics } from '@/utils/topics';


export default function Learn() {
  console.log(blockchainTopics[0].category)
  const dispatch = useDispatch();
  const router = useRouter();
  const { subject, proficiency, topic } = useSelector((state: RootState) => state.subject);
  const progress = useSelector((state: RootState) => state.subject.progress);
  const [, setAgent] = React.useState<Agent | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const currentTopic = progress.length > 0 ? progress[progress.length - 1].topic : "No topic";

  const handleSetProgress = (topicName: string, percentage: number) => {
    dispatch(setProgress({ topic: topicName, percentage }));
  };

  useEffect(() => {
    if (!subject || !proficiency) {
      router.push('/');
    }
  }, [subject, proficiency, router]);

  const callAgent = () => {
    const agent = new Agent(subject, proficiency, topic, handleAddMessage);
    setAgent(agent);
    agent.run();
  }

  const handleAddMessage = (message : Message) => {
    console.log(messages);
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
            <span className='block'>{subject}</span>
          </div>
          <div>
            <p className="mr-2 font-bold font-mon">Proficiency:</p>
            <p className='block'>{proficiency}</p>
          </div>
          <div>
            <p className="mr-2 font-bold font-mon">Current Progress:</p>
            <p className='block'>{progress.length}</p>
          </div>
          <div className='mr-7'>
            <p className="mr-2 font-bold font-mon">Current Topic:</p>
            <p className='block'>{currentTopic}</p>
          </div>
        </div>
        <div className='layout relative flex flex-col items-center justify-center py-12 text-center'>
          {currentTopic==="No topic" && (<ShowTopics blockchainTopics={blockchainTopics} />)}
          {currentTopic!="No topic" && (
            <Study>
              <Window messages={messages} />
            </Study>
          )}
        </div>

        {/* Add control block here with chat input, and contexual buttons */}
        <div className='flex items-center justify-center bg-gray-200 px-4 py-2'>
          <Button onClick={callAgent}>Call Agent</Button>
          <Button className='m-4' onClick={() => handleSetProgress(currentTopic, progress.percentage + 1)}>Inc progress</Button>
        </div>
      </section>
    </main>
    </Layout>
  );
};

const ShowTopics = ({blockchainTopics}) => {
  const progress = useSelector((state: RootState) => state.subject.progress);
  const dispatch = useDispatch();

  const handleSetProgress = (topicName: string) => {
    dispatch(setProgress({ topic: topicName }));
  };


  console.log(progress)

  return(
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome! To start, choose a topic:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {blockchainTopics.map((category, index) => (
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
/* 

Implement:

[ ] Educational Snippet message type 
[ ] Test message type 
[ ] Text input message type 
[ ] System instructions for the user
[ ] 

*/