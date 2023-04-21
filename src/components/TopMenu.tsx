import * as React from 'react';
import { HiArrowLeft, HiHome } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';

import { RootState } from '@/store/store';
import { setProgress } from '@/store/subjectSlice';


const TopMenu = () => {
  const dispatch = useDispatch();
  const { subjectName } = useSelector((state: RootState) => state.subject);

  const handleReSetProgress = () => {
    dispatch(setProgress({ topicTitle: "No topic" }));
  };

  return (
    <div className='flex mt-2'>
      <ButtonLink
        variant='primary'
        href='/'
        leftIcon={HiHome}
        className='h-9 mr-3'
      >
      </ButtonLink>
      <Button
        variant='outline'
        onClick={() => handleReSetProgress()}
        leftIcon={HiArrowLeft}
      >
        {subjectName}
      </Button>
    </div>
  );
};

export default TopMenu
