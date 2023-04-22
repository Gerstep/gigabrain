// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from 'react';
import { useEffect } from 'react';
import { FiSend } from 'react-icons/fi'
import { useSelector } from 'react-redux';

import type Message from '@/components/Agent'
import Agent from '@/components/Agent';
import Messages from '@/components/Messages';

import { RootState } from '@/store/store';

const Discussion = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { subjectName, topicTitle } = useSelector((state: RootState) => state.subject);
  const [inputValue, setInputValue] = React.useState('');
  const [agent, setAgent] = React.useState<Agent | null>(null);

  const person = "Satoshi Nakamoto";
  const currentTopic = topicTitle ? topicTitle : "No topic";


  const initialMessage = {
    type: "action",
    value: "Choose your action",
    actions: [
      "Say Hello"
    ]
  }

  const initialMessageTwo = {
    type: "system",
    value: "This is a conversation with " + person + " about " + subjectName + " and " + topicTitle
  }


  useEffect(() => {
    if (!messages || messages.length === 0) {
      setMessages([initialMessageTwo]);
    }
    if (messages.length === 1) {
      handleAddMessage(initialMessage)
    }
  }, [messages]);

  const killAgent = () => {
    if (agent) {
      setAgent(null);
      setMessages();
    }
  };

  const callAgent = (action: string) => {
    const agent = new Agent(
      subjectName,
      currentTopic,
      action,
      handleAddMessage);
    setAgent(agent);
    agent.discuss(person, 'hey');
  }

  const handleAddMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <>
      <div className='layout w-full relative flex flex-col justify-center py-4 text-center'>
        <div id="layout" className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 py-5 md:justify-center">
          <div id="layout" className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 py-5 md:justify-center">
            <Messages messages={messages} callAgent={callAgent} />
          </div>
        </div>
        <div className="w-full max-w-screen-lg flex flex-col items-center justify-between py-5 md:flex-row">
          <div className="flex justify-center items-center w-full md:w-1/2 md:justify-start flex-1">
            <input type="text" placeholder="Ask any question here" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyUp={(e) => {
              if (e.key === "Enter" && agent) {
                agent.discuss(person, inputValue);
                setInputValue("");
              }
            }} />
          </div>
          <div className="flex justify-center items-center ml-5 mt-4 md:mt-0">
            <div class="group flex relative">
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md mr-4 flex items-center"
                disabled={!agent}
                onClick={() => { agent.discuss(person, inputValue); setInputValue('') }}
              >
                <FiSend />&nbsp;Ask {person}
              </button>
              {!agent && (<span class="group-hover:opacity-100 transition-opacity bg-emerald-700 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-7 mx-auto w-48">Start the lesson first</span>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discussion