import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { setProgress } from '@/store/subjectSlice';

const Study = ({ children }) => {
  const progress = useSelector((state: RootState) => state.subject.progress);

  const currentTopic = progress.length > 0 ? progress[progress.length - 1].topic : "No topic";

  const handleSetProgress = (topicName: string, percentage: number) => {
    dispatch(setProgress({ topic: topicName, percentage }));
  };


  return (
    <>
      <h2>Doing {currentTopic}</h2>

      <p>Learn about {currentTopic}</p>
      <p>Key terms</p>
      <p>Take quiz</p>
      <p>Complete topic</p>

      {children}
    </>
  );
};

export default Study