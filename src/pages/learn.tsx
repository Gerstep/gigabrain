// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-console */
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
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
import { setContext } from '@/store/subjectSlice';

import { subjects } from '@/utils/topics';

const initialMessage = {
  type: "action",
  value: "Choose your action",
  actions: [
    "Start Exploring",
    // "Glossary"
  ]
}

const initialMessageTwo = {
  type: "system",
  value: "My name is GigaBrain 👋 You can ask me any question, or let me come up with a few topic to start the journey.\n\nDuring the education you can select any term or phrase to learn more about that topic. You can also choose to test your knowledge based on the material we already studied."
}

export default function Learn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { subjectId, subjectName, proficiency, topic } = useSelector((state: RootState) => state.subject);
  const progress = useSelector((state: RootState) => state.subject.progress);
  const contextData = useSelector((state: RootState) => state.subject.contextData);
  const [agent, setAgent] = React.useState<Agent | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedText, setSelectedText] = React.useState('');
  const [buttonPosition, setButtonPosition] = React.useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const [inputValue, setInputValue] = React.useState('');

  const currentTopic = progress.length > 0 ? progress[progress.length - 1].topic : "No topic";

  const handleSelection = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);

    if (window.getSelection().rangeCount > 0) {
      const selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      if (buttonRef.current) {
        setButtonPosition({
          top: selectionRect.top - buttonRef.current.offsetHeight,
          left: selectionRect.left + (selectionRect.width - buttonRef.current.offsetWidth) / 2,
        });
      }
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setSelectedText('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', handleSelection);
    return () => {
      window.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  const handleReSetProgress = () => {
    dispatch(setProgress({ topic: "No topic" }));
  };

  const handleSetContextData = (context) => {
    dispatch(setContext({ contextData: context }));
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.type === "answer") {
      handleSetContextData(lastMessage.value);
    }
  }, [messages]);


  useEffect(() => {
    if (!messages || messages.length === 0) {
      setMessages([initialMessageTwo]);
    }
    if (messages.length === 1) {
      handleAddMessage(initialMessage)
    }
  }, [messages]);

  useEffect(() => {
    if (!subjectId || !proficiency) {
      router.push('/');
    }
  }, [subjectId, proficiency, router]);

  const callAgent = (action: string) => {
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

  const handleAddMessage = (message: Message) => {
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
              <p className="mr-2 font-bold font-mon">Level:</p>
              <p className='block'>{proficiency}</p>
            </div>
            <div className='mr-7'>
              <p className="mr-2 font-bold font-mon">Current Topic:</p>
              <p className='block'>{currentTopic}</p>
            </div>
          </div>
          <div className='layout w-full relative flex flex-col items-center justify-center py-4 text-center' onMouseUp={handleSelection}>
            {subjectId && currentTopic === "No topic" && (
              <ShowTopics subjectId={subjectId} />
            )}
            {currentTopic != "No topic" && (
              <Study>
                {selectedText && agent && (
                  <div ref={buttonRef} style={{ position: 'absolute', top: buttonPosition.top, left: buttonPosition.left, zIndex: 9999, }}>
                    <Button onClick={() => agent.explain(selectedText)}>
                      Explain
                    </Button>
                  </div>
                )}
                <Messages messages={messages} callAgent={callAgent} agent={agent} />
              </Study>
            )}
            <div className="flex flex-col items-center justify-center w-full py-4">
              <div className="w-full max-w-screen-lg flex flex-col items-center justify-between py-5 md:flex-row">
                <div className="flex justify-center items-center w-full md:w-1/2 md:justify-start">
                  <input type="text" placeholder="Type your message here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <div className="flex justify-center items-center w-full md:w-1/2 md:justify-end mt-4 md:mt-0">
                  <button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md mr-4"
                    disabled={!agent}
                    onClick={() => { agent.ask(inputValue) }}
                  >
                    Ask Tutor
                  </button>
                  <button
                    className="bg-emerald-500 hover:bg-gray-300 text-white py-2 px-4 rounded-md mr-4"
                    onClick={() => { agent ? agent.run() : callAgent() }}
                  >
                    Explore Topics
                  </button>

                  <button
                    className="bg-emerald-500 hover:bg-gray-300 text-white py-2 px-4 rounded-md"
                    disabled={contextData.length === 0}
                    onClick={() => { agent.test(contextData) }}
                  >
                    Test Myself ({contextData.length})
                    <span class="tooltiptext">Start the lesson first</span>
                  </button>

                </div>
              </div>
            </div>
            {agent && (



              <div className="flex-wrap p-2 border-green-600 border-e-2 border-s-2 rounded-lg bg-green-200 w-1/2">
                <Button onClick={() => agent.run()} className="mx-5 px-3 h-10 text-xs">Explore more topics</Button>

                {contextData != '' && (
                  <Button onClick={() => { agent.test(contextData) }} className="mx-5 px-3 h-10 text-xs">Test myself ({contextData.length})</Button>
                )}
              </div>

            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

// Chat input -> agent(text)
// <Chat agent={agent} 

const ShowTopics = ({ subjectId }) => {
  const dispatch = useDispatch();

  const handleSetProgress = (topicName: string) => {
    dispatch(setProgress({ topic: topicName }));
    dispatch(setContext({ contextData: 'reset' }));
  };

  return (
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