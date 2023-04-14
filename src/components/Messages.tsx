import * as React from 'react';

import type { Message } from '@/components/Agent';

interface Window {
  messages: Message[];
}

const Window = ( {messages} : {messages: Message[]} ) => {
  return(
    <>
      <ShowMessage message={{
        type: "system",
        value: "Welcome to GigaBrain Academy 🤯"
      }} />

      {messages.map((message, index) => (
        <ShowMessage key={`${index}-${message.type}`} message={message} />
      ))}
    </>
  )
}

const ShowMessage = ({message} : {message : Message}) => {
  return(
    <>
    <p> &gt; {message.value}</p>
    </>
  )
}

export default Window;
export { ShowMessage };