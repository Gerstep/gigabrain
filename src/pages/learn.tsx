/* eslint-disable no-console */
import * as React from 'react';
import { useSelector } from 'react-redux';

import type Message from '@/components/Agent'
import Agent from '@/components/Agent';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { RootState } from '@/store/store';

export default function Learn() {
  const { subject, proficiency, topic } = useSelector((state: RootState) => state.subject);
  const [, setAgent] = React.useState<Agent | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const callAgent = () => {
    const agent = new Agent(subject, proficiency, topic, handleAddMessage);
    setAgent(agent);
    agent.run();
  }

  const handleAddMessage = (message : Message) => {
    setMessages((prev) => [...prev, message]);
    console.log(messages);
  };

  return (
    <Layout>
    {/* <Seo templateTitle='Home' /> */}
    <Seo />

    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          subhject: 
          {subject}
          <p> prof: {proficiency} </p>
          <p> topic: {topic} </p>
          <p>
            <Button onClick={callAgent}>Call Agent</Button>
          </p>
        </div>
      </section>
    </main>
    </Layout>
  );
};