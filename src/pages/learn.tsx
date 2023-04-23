// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-console */
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { FiSend } from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import type Message from '@/components/Agent'
import Agent from '@/components/Agent';
import Button from '@/components/buttons/Button';
import { CourseOverview } from '@/components/CourseOverview';
import Discussion from '@/components/Discussion';
import Lab from '@/components/Lab';
import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import LoginButton from '@/components/LoginButton';
import Messages from '@/components/Messages';
import Seo from '@/components/Seo';
import TopMenu from '@/components/TopMenu';

import { RootState } from '@/store/store';
import { setContext } from '@/store/subjectSlice';

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
  value: "My name is GigaBrain, I'm your personal tutor 👋\n\nAsk me questions or explore the topic with me. Select any term or phrase to learn more about it. Test your knowledge based on the material we already studied."
}

export default function Learn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { subjectId, subjectName, topicTitle, classType } = useSelector((state: RootState) => state.subject);
  const contextData = useSelector((state: RootState) => state.subject.contextData);
  const [agent, setAgent] = React.useState<Agent | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedText, setSelectedText] = React.useState('');
  const [buttonPosition, setButtonPosition] = React.useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const [inputValue, setInputValue] = React.useState('');

  const currentTopic = topicTitle ? topicTitle : "No topic";

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

  const handleSetContextData = (context) => {
    dispatch(setContext({ contextData: context }));
  };

  useEffect(() => {
    const answers = messages.filter((message) => message.type === "answer");
    const uniqueAnswers = Array.from(new Set(answers.map((answer) => answer.value)));
    handleSetContextData(uniqueAnswers);
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
    if (!subjectName) {
      router.push('/');
    }
  }, [subjectName, router]);


  const killAgent = () => {
    if (agent) {
      setAgent(null);
      setMessages([]);
    }
  };

  const callAgent = (action: string) => {
    const agent = new Agent(
      subjectName,
      currentTopic,
      action,
      handleAddMessage);
    setAgent(agent);
    agent.start();
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
          <div className="bg-green-100 shadow-lg text-black px-4 flex justify-between items-center">
            <div className='mb-2'>
              <TopMenu subjectName={subjectName} />
            </div>
            <div className=''>
              <div><LoginButton /></div>
            </div>
          </div>

          {subjectId && currentTopic === "No topic" && (
            <CourseOverview subjectId={subjectId} agent={agent} killAgent={killAgent} />
          )}
          {currentTopic != "No topic" && (classType === 'seminar' || classType === 'lecture') && (
            <div className='layout w-full relative flex flex-col justify-center py-4 text-center' onMouseUp={handleSelection}>
              <div id="layout" className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 py-5 md:justify-center">
                {selectedText && agent && (
                  <div ref={buttonRef} style={{ position: 'absolute', top: buttonPosition.top, left: buttonPosition.left, zIndex: 9999, }}>
                    <Button onClick={() => agent.explain(selectedText)}>
                      Explain
                    </Button>
                  </div>
                )}
                <Messages messages={messages} callAgent={callAgent} agent={agent} />
              </div>
              <div className="w-full max-w-screen-lg flex flex-col items-center justify-between py-5 md:flex-row">
                <div className="flex justify-center items-center w-full md:w-1/2 md:justify-start flex-1">
                  <input type="text" placeholder="Ask any question here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyUp={(e) => {
                    if (e.key === "Enter" && agent) {
                      agent.ask(inputValue);
                      setInputValue("");
                    }
                  }} />
                </div>
                <div className="flex justify-center items-center w-full md:w-1/2 mt-4 md:mt-0">
                  <div class="group flex relative">
                    <button
                      className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md mr-4 flex items-center"
                      disabled={!agent}
                      onClick={() => { agent.ask(inputValue); setInputValue('') }}
                    >
                      <FiSend />&nbsp;Ask Tutor
                    </button>
                    {!agent && (<span class="group-hover:opacity-100 transition-opacity bg-emerald-700 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-7 mx-auto w-48">Start the lesson first</span>)}
                  </div>

                  <button
                    className="bg-emerald-700 hover:bg-emerald-900 text-white py-2 px-4 rounded-md mr-4"
                    onClick={() => { agent ? agent.run() : callAgent() }}
                  >
                    Generate Questions
                  </button>

                  <div class="group flex relative">
                    <button
                      className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md"
                      data-tooltip-target="tooltip-default"
                      disabled={contextData.length === 0}
                      onClick={() => { agent.test(contextData) }}
                    >
                      Test Myself

                    </button>
                    {contextData.length === 0 && (<span class="group-hover:opacity-100 transition-opacity bg-emerald-700 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 -m-8 mx-auto w-30">Complete at least one topic first</span>)}
                  </div>

                </div>
              </div>
            </div>
          )}
          {currentTopic != "No topic" && classType === 'laboratory' && (
            <Lab />
          )}
          {currentTopic != "No topic" && classType === 'discussion' && (
            <Discussion />
          )}
        </section>
      </main>
      <Footer />
    </Layout >
  );
};