import * as React from 'react';

export interface Progress {
  topic: string;
  percentage: number;
}

export const defaultProgress: Progress = {
  topic: 'Blockchain fundamentals',
  percentage: 0,
};

export const ProgressContext = React.createContext<{
  progress: Progress;
  updateProgress: (newTopic: string, newPercentage: number) => void;
}>({
  progress: defaultProgress,
  updateProgress: () => {},
});

export const updateProgress = (
  newTopic: string,
  newPercentage: number,
  setProgress: React.Dispatch<React.SetStateAction<Progress>>
  ) => {
    setProgress({ topic: newTopic, percentage: newPercentage });
};