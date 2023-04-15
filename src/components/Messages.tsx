import autoAnimate from "@formkit/auto-animate";
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import type { Message } from '@/components/Agent';
import ButtonLink from "@/components/links/ButtonLink";
import Expand from "@/components/motions/Expand";

interface Window {
  messages: Message[];
}

const messageListId = "chat-window-message-list";

const Window = ( {messages} : {messages: Message[]} ) => {
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

  return(
    <>
      <div className= "border-translucent flex w-full flex-col rounded-2xl border-2 border-white/20 bg-emerald-50 text-black shadow-2xl drop-shadow-lg ">
        <div
          className="mb-2 mr-2 h-[34em] overflow-y-auto overflow-x-hidden sm-h:h-[17em] md-h:h-[22em] lg-h:h-[30em] "
          ref={scrollRef}
          onScroll={handleScroll}
          id={messageListId}
        >
          {messages.map((message, index) => (
            <ShowMessage key={`${index}-${message.type}`} message={message} />
          ))}
        {messages.length === 0 && (
          <>
            <Expand delay={0.5} type="spring">
              <ShowMessage message={{
                type: "system",
                value: "Welcome to GigaBrain Academy 🤯"
              }} />
            </Expand>

            <Expand delay={0.9} type="spring">
              <ShowMessage message={{
                type: "action",
                value: "Choose your action",
                actions: [
                  "Learn Terms and Definitions",
                  "Explore the Topic",
                  "Test Yourself"
                ]
              }} />
            </Expand>
          </>
        )}
      </div>
    </div>
    </>
  )
}

const ShowMessage = ({message} : {message : Message}) => {
  return(
    <>
    <div className="mx-2 my-1 rounded-lg border-[2px] border-emerald-500 bg-emerald-100 p-1 font-mono text-sm hover:border-emerald-700 sm:mx-4 sm:p-3 sm:text-base"> 
      <span className="mr-2 font-bold">🧪 {getMessagePrefix(message)}</span>
      <div className="mb-2">
        <span>{message.value}</span>
      </div>
      {message.actions && (
        <div className="flex flex-wrap">
          {message.actions.map((action, index) => (
            <div key={index} className="mr-2 mb-2">
              <ButtonLink href="" className="px-3">
                {action}
              </ButtonLink>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

const getMessagePrefix = (message: Message) => {
  switch (message.type) {
    case "topic":
      return "Topic:";
    case "system":
      return "Added task:";
    case "thinking":
      return "Thinking...";
    case "action":
      return message.info ? message.info : "Executing:";
  }
};

export default Window;
export { ShowMessage };