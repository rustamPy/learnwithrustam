'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PdfViewer from '@/components/PdfViewer';
import AudioPlayer from '@/components/AudioPlayer';
import { Typography, Progress, Chip } from '@material-tailwind/react';

import { audioMap, chapterMap } from './data';

const pdfFile = 'book1.pdf';

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleAudio, setVisibleAudio] = useState(null);
    const [showGuidance, setShowGuidance] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [isContentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 1153);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = 171;
    const progress = (currentPage / totalPages) * 100;

    const handlePageChange = ({ currentPage }) => {
        setCurrentPage(currentPage);
        setVisibleAudio(null);
    };

    const toggleAudio = (index) => {
        setVisibleAudio(visibleAudio === index ? null : index);
    };

    const toggleGuidance = () => {
        setShowGuidance(!showGuidance);
    };

    const handleGetStartedClick = () => {
        setContentVisible(true);
        setTimeout(() => {
            const targetElement = document.getElementById('start');
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: targetPosition - 70,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    const currentChapter = chapterMap.find(
        (chapter) => currentPage >= chapter.range[0] && currentPage <= chapter.range[1]
    );

    const totalAudios = currentChapter
        ? chapterMap.reduce((total, chapter) => {
            if (chapter.range[0] >= currentChapter.range[0] && chapter.range[1] <= currentChapter.range[1]) {
                return total + Object.values(audioMap).slice(chapter.range[0], chapter.range[1] + 1).flat().length;
            }
            return total;
        }, 0)
        : 0;

    if (mobile) {
        return (
            <div className="p-5 bg-red-100 text-red-800 border border-red-800 shadow-inner">
                <p>Oops! Looks like this page is taking a nap on mobile devices. It's only awake and active on computer screens.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center py-8">
            <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8">
                    <h2 className="text-lg font-semibold text-lwr-orange-color-200 dark:text-lwr-orange-color-100 tracking-wide uppercase">Explore Polish Language Learning</h2>
                    <div className="relative inline-flex items-center justify-center w-full">
                        <img src="/imgs/polish_flag.png" className="rounded-full w-24 h-24 md:w-28 md:h-28 border-4 border-gray-200 dark:border-white relative" alt="Polish flag" />
                    </div>
                    <p className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
                        "Polski Krok po Kroku"
                        <span className="px-2 py-1 relative inline-block">
                            <svg className="stroke-current bottom-0 absolute text-blue-300 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                            </svg>
                            <span className="relative">Study Emulator</span>
                        </span>
                    </p>
                    <p className="max-w-4xl mt-4 mx-auto text-xl text-gray-500 dark:text-gray-300">Dive into learning Polish with an interactive study simulator.</p>
                    <button onClick={handleGetStartedClick} className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:from-lwr-orange-color-100 dark:to-lwr-blue-color-500 dark:hover:from-lwr-orange-color-200 dark:hover:to-lwr-blue-color-600 inline-block px-8 py-4 mt-8 text-white font-semibold rounded-2xl`}>
                        {!isContentVisible ? 'Get Started' : 'Continue Learning'}
                    </button>
                </div>
            </section>

            <AnimatePresence>
                <div id="start" className="w-full">
                    {isContentVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 200 }}
                            animate={{ opacity: 1, y: 50 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 2 }}
                            className='w-full'
                        >
                            <div className="flex flex-col h-screen mb-[200px]">
                                {/* Header */}
                                <div className="w-full p-4 border-b border-gray-300 dark:border-gray-800">
                                    <div className="relative">
                                        <div className="flex justify-center space-x-3 mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Chip variant="ghost" value="New" size="sm" color="green" className="rounded-full dark:text-gray-300" />
                                                <Chip variant="ghost" value="Beta" size="sm" color="red" className="rounded-full dark:text-gray-300" />
                                                <Chip variant="ghost" value="Desktop Only" size="sm" color="blue" className="rounded-full dark:text-gray-300" />
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 flex gap-2 mt-2">
                                            <Chip
                                                value="Guide"
                                                color="light-blue"
                                                className="cursor-pointer"
                                                onClick={toggleGuidance}
                                            />
                                        </div>
                                    </div>

                                    <Typography variant="h6" className="text-center mt-2 text-gray-700 dark:text-gray-300">
                                        Listen to the audio lessons while you study
                                    </Typography>
                                    {showGuidance && (
                                        <div className="mt-4 text-center p-4 bg-blue-100 dark:bg-gray-800 rounded-lg">
                                            <Typography variant="h6" className="text-gray-800 dark:text-gray-300">
                                                This is a guidance section that provides tips and instructions on how to use the study emulator effectively.
                                                Click the "Guide" chip again to hide this section.
                                            </Typography>
                                            <ul className="list-disc mt-2 text-left mx-auto max-w-3xl text-gray-800 dark:text-gray-300">
                                                <li>Use the PDF viewer on the left to navigate through the pages of the textbook.</li>
                                                <li>On the right, you will find the audio tracks related to the current page.</li>
                                                <li>Click on the bar or "Show" button next to each audio label to reveal the audio player.</li>
                                                <li>You can listen to the audio while reading the corresponding text in the PDF viewer.</li>
                                                <li>Your progress through the book is tracked at the top of the right section.</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {/* Content */}
                                <div className="flex h-full">
                                    {/* PDF Viewer */}
                                    <div className="flex-[3] border-r border-gray-300 dark:border-gray-800 p-4">
                                        <PdfViewer fileUrl={pdfFile} onPageChange={handlePageChange} />
                                    </div>
                                    {/* Audio Viewer */}
                                    <div className="flex-[1.5] p-4 overflow-y-auto">
                                        <div className="w-full mb-4">
                                            <div className="mb-2 flex items-center justify-between gap-4">
                                                <Typography variant="h6">
                                                    Completed
                                                </Typography>
                                                <Typography variant="h6">
                                                    {progress.toPrecision(2)}%
                                                </Typography>
                                            </div>
                                            <Progress value={progress} variant="gradient" color="amber" />
                                        </div>
                                        {currentChapter ? (
                                            <AudioPlayer
                                                audioMap={audioMap}
                                                currentPage={currentPage}
                                                visibleAudio={visibleAudio}
                                                toggleAudio={toggleAudio}
                                            />
                                        ) : (
                                            <Typography className='text-lwr-blue-color-500 dark:text-lwr-blue-color-20'>No chapter information available for this page.</Typography>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </AnimatePresence>
        </div>
    );
};

export default Page;