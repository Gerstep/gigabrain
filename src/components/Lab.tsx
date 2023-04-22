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

  const task = "who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?who is Satoshi Nakamoto?";
  const currentTopic = topicTitle ? topicTitle : "No topic";


  const initialMessage = {
    type: "system",
    value: "Your task: " + task
  }

  const initialMessageTwo = {
    type: "system",
    value: "This is a practical task. Complete the following assignment and receieve evaluation and feedback on your work."
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

  const callAgent = (action: string, task: string, inputValue: string) => {
    const agent = new Agent(
      subjectName,
      currentTopic,
      action,
      handleAddMessage);
    setAgent(agent);
    agent.verify(task, inputValue);
  }

  const handleAddMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <>
      <div className='layout w-full relative flex flex-col justify-center py-4 text-center'>
        <div id="layout" className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 py-5 md:justify-center">
          <Messages messages={messages} callAgent={callAgent} height='h-[21em] overflow-y-auto overflow-x-hidden sm-h:h-[12em] md-h:h-[16em] lg-h:h-[19em]' />
        </div>

        <div className="w-full max-w-screen-lg flex flex-col items-end justify-between py-5 md:flex-row">
          <div className="flex justify-center items-center w-full md:w-1/2 md:justify-start flex-1">
            <textarea type="text" placeholder="Type your answer" className="w-full px-3 py-2 border h-36 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </div>
          <div className="flex justify-center items-end ml-5 mt-4 md:mt-0">

            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md mr-4 flex items-center"
              onClick={() => { callAgent("verify", task, inputValue); setInputValue('') }}
            >
              <FiSend />&nbsp;Send response
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discussion