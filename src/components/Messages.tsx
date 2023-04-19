// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import autoAnimate from "@formkit/auto-animate";
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BsRocketTakeoffFill } from 'react-icons/bs';

import type { Message } from '@/components/Agent';
import Button from "@/components/buttons/Button";

interface Window {
  messages: Message[];
}

const messageListId = "chat-window-message-list";

const Window = ({
  messages,
  callAgent,
  agent }:
  {
    messages: Message[],
    callAgent: () => void,
    agent: () => void,
  }
) => {
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    // Use has scrolled if we have scrolled up at all from the bottom
    if (scrollTop < scrollHeight - clientHeight - 10) {
      setHasUserScrolled(true);
    } else {
      setHasUserScrolled(false);
    }
  };

  useEffect(() => {
    // Scroll to bottom on re-renders
    if (scrollRef && scrollRef.current) {
      if (!hasUserScrolled) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  });

  useEffect(() => {
    scrollRef.current && autoAnimate(scrollRef.current);
  }, [messages]);

  console.log(messages)

  return (
    <>
      <div className="border-translucent flex w-full flex-col rounded-2xl border-2 border-white/20 bg-emerald-50 text-black shadow-2xl drop-shadow-lg ">
        <div
          className="mb-2 mr-2 h-[34em] overflow-y-auto overflow-x-hidden sm-h:h-[17em] md-h:h-[22em] lg-h:h-[30em] "
          ref={scrollRef}
          onScroll={handleScroll}
          id={messageListId}
        >
          {messages.map((message, index) => (
            <>
              {/* <Expand delay={0.5} type="spring"> */}
              <ShowMessage message={message} callAgent={callAgent} agent={agent} key={index} />
              {/* </Expand> */}
            </>
          ))}
        </div>
      </div>
    </>
  )
}

const ShowMessage = (props: {
  message: Message;
  callAgent: (action: string) => void;
  agent?: (action: string) => void;
}) => {
  return (
    <div className="mx-2 my-1 rounded-lg border-[2px] border-emerald-500 bg-emerald-100 p-1 font-mono text-sm hover:border-emerald-700 sm:mx-4 sm:p-3 sm:text-base flex flex-col">
      <div className="flex flex-wrap">
        <span className="mr-2 font-bold">{getMessageEmoji(props.message)} {getMessagePrefix(props.message)}</span>
        <div className="mb-2 flex-1 text-left">
          <pre className="break-words whitespace-pre-wrap">{props.message.value}</pre>
        </div>
        {props.message.type === "answer" && (<span className="mr-2 font-bold">save</span>)}
      </div>
      {props.message.actions && (
        <div className="flex flex-wrap pt-2">
          {props.message.actions.map((action, index) => (
            <div key={index} className="mr-2 mb-2">
              {props.agent && action === "ask" && props.message.type === "topic" && (
                <Button onClick={() => props.agent.explore(props.message.value)} className="px-3 h-6 text-xs">Learn → </Button>
              )}
              {props.agent && props.message.type === "test" && (
                <Button onClick={() => props.agent.answerTest(action)} className="px-3 h-6 text-xs bg-amber-600 border-orange-700 hover:bg-amber-900">{action.endsWith("(correct)") ? action.replace("(correct)", "") : action}</Button>
              )}
              {!props.agent && (
                <Button onClick={() => props.callAgent(action)} className="px-3 h-10 text-xs">
                  <BsRocketTakeoffFill /> &nbsp; {action}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const getMessageEmoji = (message: Message) => {
  switch (message.type) {
    case "system":
      return "🧠";
    case "thinking":
      return "🤔";
    case "test":
      return "👨🏻‍🏫"
    case "answer":
      return "🧪";
    case "result":
      return "🔎";
  }
}

const getMessagePrefix = (message: Message) => {
  switch (message.type) {
    case "topic":
      return "Topic:";
    case "system":
      return "";
    case "thinking":
      return "Working on it...";
    case "answer":
      return "Answer:";
    case "test":
      return "Test yourself:";
    case "result":
      return "Your answer:";
    case "action":
      return message.info ? message.info : "";
  }
};

export default Window;
export { ShowMessage };