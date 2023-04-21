// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

const Study = ({ children }) => {
  const topicTitle = useSelector((state: RootState) => state.subject.topicTitle);

  const currentTopic = topicTitle ? topicTitle : "No topic";

  return (
    <>
      <div className='text-2xl text-emerald-900 font-bold'>Learning {currentTopic}</div>
      <div id="layout" className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 py-5 md:justify-center">
        {children}
      </div>
    </>
  );
};

export default Study