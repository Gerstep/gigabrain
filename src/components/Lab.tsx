// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

const Lab = () => {
  const { subjectId, subjectName, topicTitle, classType } = useSelector((state: RootState) => state.subject);
  return (
    <>

    </>
  );
};

export default Lab