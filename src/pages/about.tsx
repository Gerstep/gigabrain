import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from "react";
import { MdOutlinePersonPinCircle, MdOutlineSmartToy, MdWatchLater } from 'react-icons/md'

import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from "@/components/Seo";

interface BenefitBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}


const BenefitBox = ({ icon, title, description }: BenefitBoxProps) => {
  return (
    <motion.div
      className="w-full md:w-1/3 p-4"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-emerald-500 text-white">
        {icon}
      </div>
      <h3 className="text-lg font-medium mt-4 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function About() {
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <div className="">
        <div className="py-20 text-center bg-emerald-500 text-white">
          <h1 className="text-4xl font-bold mb-4"><Link href="/">GigaBrain</Link></h1>
          <p className="text-xl mb-8">
            Personalized education is not available for anyone, anywhere, for free
          </p>
        </div>

        <div className="container mx-auto max-w-5xl py-8">
          <div className="flex flex-wrap">
            <BenefitBox
              icon={<MdOutlineSmartToy />}
              title="Knowledgeable"
              description="Has access to most of the world's knowledge"
            />
            <BenefitBox
              icon={<MdWatchLater />}
              title="Patient"
              description="A tutor that is never tired"
            />
            <BenefitBox
              icon={<MdOutlinePersonPinCircle />}
              title="Personalized"
              description="Always adapting to your own pace and interests"
            />
          </div>
        </div>
      </div>
      <div className="bg-emerald-500 pt-12 pb-10">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-white mb-12 text-center">Use GigaBrains in your application or educational process</p>

          <div className="flex justify-center">
            <ButtonLink href="mailto:gershuni.stepan@gmail.com" className="bg-white hover:bg-gray-100 text-emerald-500 font-bold py-2 px-4 rounded-full transition-all duration-200">
              Contact
            </ButtonLink>
          </div>
        </div>
      </div>

      <footer className='bg-white  pt-5 w-full text-center py-4 bottom-0 left-0  text-gray-700'>
        © {new Date().getFullYear()} GigaBrain Academy | &nbsp;
        <UnderlineLink href="/"> Home</UnderlineLink> &nbsp;
        <UnderlineLink href="/about"> About</UnderlineLink>
      </footer>

    </>
  );
}
