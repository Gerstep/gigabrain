import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from "react";
import { MdExtension, MdOutlineMoneyOffCsred, MdOutlinePersonPinCircle, MdOutlineShuffleOn, MdOutlineSmartToy, MdWatchLater } from 'react-icons/md'

import Footer from '@/components/layout/Footer';
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
      className="w-full md:w-1/3 p-4 pb-10"
      whileHover={{ scale: 1.05, backgroundColor: "rgb(209 250 229)" }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-md bg-emerald-500 text-white">
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
        <div className="py-14 text-center bg-emerald-500 text-white">
          <p className="text-4xl mb-8"><Link href="/">GigaBrain</Link></p>
          <p className="text-2xl font leading-relaxed">
            Personalized education:<br />
            <b>any subject,<br /> any language,<br /> anywhere, <br /> for free.</b>
          </p>
        </div>

        <div className="container mx-auto max-w-5xl py-8">
          <div className="flex flex-wrap">
            <BenefitBox
              icon={<MdOutlineSmartToy size={50} />}
              title="Knowledgeable"
              description="Has access to most of the world's knowledge"
            />
            <BenefitBox
              icon={<MdWatchLater size={50} />}
              title="Patient"
              description="A tutor that is never tired, distracted, or lazy"
            />
            <BenefitBox
              icon={<MdOutlinePersonPinCircle size={50} />}
              title="Personalized"
              description="Always adapting to your own pace and interests"
            />
            <BenefitBox
              icon={<MdExtension size={50} />}
              title="Extendable"
              description="Improve GigaBrains bot with your own course material"
            />
            <BenefitBox
              icon={<MdOutlineShuffleOn size={50} />}
              title="Flexible"
              description="Learn in any language or difficulty level"
            />
            <BenefitBox
              icon={<MdOutlineMoneyOffCsred size={50} />}
              title="Accessible"
              description="Free for learners, available on any device"
            />
          </div>
        </div>
      </div>
      <div className="bg-emerald-500 pt-12 pb-10">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-white mb-2 text-center">Use GigaBrains in your application or educational process</p>
          <p className="text-white mb-12 text-center">Contact <UnderlineLink href="https://twitter.com/sgershuni">Stepan Gershuni</UnderlineLink> for details</p>

          <div className="flex justify-center">
            <ButtonLink href="https://t.me/sgershuni" className="bg-white mr-5 hover:bg-gray-100 text-emerald-500 font-bold py-2 px-4 rounded-full transition-all duration-200">
              Send a note
            </ButtonLink>
            <ButtonLink href="https://calendly.com/stepa-dot-eth" className="bg-white hover:bg-gray-100 text-emerald-500 font-bold py-2 px-4 rounded-full transition-all duration-200">
              Book a Call
            </ButtonLink>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
}
