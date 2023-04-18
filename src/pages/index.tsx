// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from 'next/image';
import router from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

import { setProgress, setSubject } from '@/store/subjectSlice';

import { subjects } from '@/utils/topics';


export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [, setSelectedProficiency] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState('');
  const dispatch = useDispatch();
  const defaultTopic = "No topic";

  function openModal(subject: React.SetStateAction<null>) {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function setProficiencyAndProceed(proficiency) {
    setSelectedProficiency(proficiency);
    dispatch(
      setSubject({
        subjectId: selectedSubject.id,
        subjectName: selectedSubject.name,
        proficiency,
      })
    );
    dispatch(      
      setProgress({
        topic: defaultTopic
    }));
    router.push('/learn');
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <div className='rounded-full overflow-hidden'>
              <Image 
              src="/images/gigabrain.png"
              alt="My image"
              width={400}
              height={400}
            />
            </div>
            <h1 className='mt-4'>
              GigaBrain Academy
            </h1>
            <p className='mt-2 text-sm text-gray-800'>
            Select what you want to learn today
            </p>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 mt-3 rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            >
              <option value="">All subjects</option>
              {[...new Set(subjects.map((subject) => subject.type))].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              {subjects
                .filter((subject) => selectedType === '' || subject.type === selectedType)
                .map((subject) => (
              <div key={subject.id}>
                <ButtonLink 
                  variant="primary" 
                  href="" 
                  className="w-full h-40 bg-green-200 rounded-lg flex flex-col items-center justify-center text-black text-xl font-semibold cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 m-5"
                  onClick={() => openModal(subject)}
                  style={subject.status !== 'open' ? { pointerEvents: 'none' } : {}}
                  >
                  <span className=''>{subject.name}</span>
                  {/* <span className='font-normal pt-5'>(course {subject.status})</span> */}
                </ButtonLink>
              </div>
              ))}
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 relative">
                <div className="absolute top-0 right-0 cursor-pointer" onClick={closeModal}>X</div>
                  <h2 className="text-2xl font-bold mb-4">
                    Select your proficiency level for {selectedSubject?.name}
                  </h2>
                  <div className="flex flex-wrap justify-center">
                    <button
                      onClick={() => setProficiencyAndProceed('beginner')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg m-2 bg-blue-500 hover:bg-yellow-500 transition-colors duration-500 ease-in-out"
                    >
                      Beginner
                    </button>
                    <button
                      onClick={() => setProficiencyAndProceed('intermediate')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg m-2 bg-blue-500 hover:bg-yellow-500 transition-colors duration-500 ease-in-out"
                    >
                      Intermediate
                    </button>
                    <button
                      onClick={() => setProficiencyAndProceed('advanced')}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg m-2 bg-blue-500 hover:bg-yellow-500 transition-colors duration-500 ease-in-out"
                    >
                      Advanced
                    </button>
                  </div>
                </div>
              </div>
            )}
            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} GigaBrain Academy
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
