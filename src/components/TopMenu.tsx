import * as React from 'react';
import { HiArrowLeft } from 'react-icons/hi';

import ButtonLink from '@/components/links/ButtonLink';

const TopMenu = () => {
  return (
    <>
      <ButtonLink
        variant='outline'
        href='/'
        leftIcon={HiArrowLeft}
      >
        Home
      </ButtonLink>
    </>
  );
};

export default TopMenu
