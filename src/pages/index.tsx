import Image from 'next/image';
import router from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

import { setSubject } from '@/store/subjectSlice';

const subjects = [
  { id: 1, name: 'GPT for Work' },
  { id: 2, name: 'Python Programming' },
  { id: 3, name: 'Smart Contracts' },
  { id: 4, name: 'Corporate Law' },
  { id: 5, name: 'Digital Marketing' },
];

const topics = [
  { id: 1, name: 'Topic 1' },
  { id: 2, name: 'Topic 2' },
  { id: 3, name: 'Topic 3' },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [selectedProficiency, setSelectedProficiency] = React.useState(null);
  const [currentStep, setCurrentStep] = React.useState(1);
  const dispatch = useDispatch();

  function openModal(subject: React.SetStateAction<null>) {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleProficiencySelected(proficiency, topic) {
    setIsModalOpen(false);
    setCurrentStep(1);
    dispatch(
      setSubject({
        subject: selectedSubject.name,
        proficiency,
        topic: topic
      })
    );
    router.push('/learn');
  }

  function setProficiencyAndProceed(proficiency) {
    setSelectedProficiency(proficiency);
    setCurrentStep(2);
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
              width={500}
              height={500}
            />
            </div>
            <h1 className='mt-4'>
              GigaBrain University
            </h1>
            <p className='mt-2 text-sm text-gray-800'>
            Select the subject you wish to study today
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              {subjects.map((subject) => (
              <div key={subject.id}>
                <ButtonLink 
                  variant="primary" 
                  href="" 
                  className="w-full h-40 bg-green-200 rounded-lg flex items-center justify-center text-black text-xl font-semibold cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 m-5"
                  onClick={() => openModal(subject)}
                  >
                  {subject.name}
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
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Select a topic to start learning</h2>
                      <div className="flex flex-wrap justify-center">
                        {topics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => handleProficiencySelected(selectedProficiency, topic.name)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg m-2"
                          >
                            {topic.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    )}
                </div>
              </div>
            )}
            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()}
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
