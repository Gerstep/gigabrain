import * as React from "react";

import Button from "@/components/buttons/Button";
import UnderlineLink from "@/components/links/UnderlineLink";

export default function Footer() {
  return (
    <footer className='bg-white  pt-5 w-full text-center py-4 bottom-0 left-0  text-gray-700'>
      © {new Date().getFullYear()} Gigabrain Academy
      <div className="pt-2">
        <UnderlineLink href="/"> Home</UnderlineLink>
        &nbsp; | &nbsp;
        <UnderlineLink href="/about"> About</UnderlineLink>
      </div>
      <div>
        <Button
          size='sm'
          variant='ghost'
          data-tally-open="31XoqM" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
        >
          Leave Feedback
        </Button>
      </div>
    </footer>

  );
}