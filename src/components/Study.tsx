// @ts-nocheck
import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

const Study = ({ children }) => {
  const progress = useSelector((state: RootState) => state.subject.progress);

  const currentTopic = progress.length > 0 ? progress[progress.length - 1].topic : "No topic";

  return (
    <>
      <h2>Learning {currentTopic}</h2>
      <div
            id="layout"
            className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 py-5 md:justify-center"
          >
      {/* <Expand> */}      
        {children}
      {/* </Expand> */}
      </div>
    </>
  );
};

export default Study