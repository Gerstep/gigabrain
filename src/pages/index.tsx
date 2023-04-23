// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from 'next/image';
import router from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import LoginButton from '@/components/LoginButton';
import Seo from '@/components/Seo';

import { setProgress, setSubject } from '@/store/subjectSlice';

import { subjects } from '@/utils/topics';

export default function HomePage() {
  const [isCreatorModalOpen, setIsCreatorModalOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState('');

  const [selectedSubject, setSelectedSubject] = React.useState<null | Subject>(null);
  const dispatch = useDispatch();
  const defaultTopic = "No topic";

  function openModal(subject: React.SetStateAction<null>) {
    setSelectedSubject(subject);
    dispatch(
      setSubject({
        subjectId: subject.id,
        subjectName: subject.name,
      })
    );
    dispatch(
      setProgress({
        topicTitle: defaultTopic
      }));
    router.push('/learn');
  }

  function openCreatorModal() {
    setIsCreatorModalOpen(true);
  }

  function closeCreatorModal() {
    setIsCreatorModalOpen(false);
  }

  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='text-black px-4 py-2 flex justify-end'>
            <LoginButton />
          </div>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <div className='rounded-full overflow-hidden'>
              <Image
                src="/images/gigabrain.png"
                alt="My image"
                width={350}
                height={350}
              />
            </div>
            <h1 className='mt-4'>
              GigaBrain Academy
            </h1>
            <div className='mt-6 font-medium text-2xl'>Featured</div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6">
              {subjects
                .filter((subject) => subject.isTop === true)
                .map((subject) => (
                  <>
                    <CourseCard subject={subject} openModal={openModal} color="featured" />
                  </>
                ))}
            </div>

            <p className='mt-2 text-2xl font-medium  text-gray-800'>
              I want to learn
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className=" mt-3 rounded-md font-medium underline-offset-4 decoration-dashed underline text-2xl border-0 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 decoration-emerald-500 hover:text-emerald-500"
              >
                <option value="">Anything</option>
                {[...new Set(subjects.map((subject) => subject.type))].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6">
              {subjects
                .filter((subject) => selectedType === '' || subject.type === selectedType)
                .map((subject) => (
                  <>
                    <CourseCard subject={subject} openModal={openModal} color="normal" />
                  </>
                ))}

              <ButtonLink
                variant="primary"
                href=""
                className="w-full h-28 bg-green-50 rounded-lg flex flex-col items-center justify-center text-black text-xl font-semibold cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 m-2"
                onClick={() => openCreatorModal()}>
                <span className='text-emerald-950 text-lg z-30'>🛠 Create your own course</span>
              </ButtonLink>
            </div>

            {isCreatorModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 relative">
                  <div className="absolute top-1 right-1 cursor-pointer font-extrabold p-1 hover:bg-emerald-100" onClick={closeCreatorModal}>X</div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="input" className="text-gray-700 font-medium">
                      Name for your course
                    </label>
                    <input
                      id="input"
                      type="text"
                      className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-emerald-500"
                    />
                    <label htmlFor="file-input" className="text-gray-700 font-medium">
                      Upload PDF with your course content
                    </label>
                    <div className="relative rounded-md shadow-sm pb-12">
                      <input
                        id="file-input"
                        type="file"
                        accept=".pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="absolute inset-0 py-2 px-3 rounded-md bg-white flex items-center justify-between border border-gray-300">
                        <span className="text-gray-500">No file selected</span>
                        <span className="text-gray-700">Choose File</span>
                      </div>
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg shadow-sm">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Footer />
          </div>
        </section>
      </main>
    </Layout>
  );
}

const CourseCard = ({ subject, openModal, color }) => {
  const getColor = (color) => {
    switch (color) {
      case "featured":
        return "amber";
      case "normal":
        return "primary";
      default:
        return "gray";
    }
  }

  return (
    <div key={subject.id} className="h-18 relative cursor-pointer mb-5 m-2">
      <div className={`absolute inset-0 bg-${getColor(color)}-300 opacity-25 rounded-lg shadow-2xl`}></div>
      <div className="inset-0 transform hover:scale-90 transition duration-300">
        <div className={`h-full w-full bg-${getColor(color)}-200 py-10 px-5 rounded-lg shadow-xl`} onClick={() => openModal(subject)}>
          <span className='text-emerald-950 text-lg font-semibold z-30 mt-auto'>{subject.name}</span>
        </div>
      </div>
    </div>
  );
};

export { CourseCard };
