'use client';
import { useState, useEffect } from 'react';
import PdfViewer from '@/components/PdfViewer';
import AudioPlayer from '@/components/AudioPlayer';
import { Typography, Card, Progress, Chip } from '@material-tailwind/react';

import { audioMap, chapterMap } from './data';

const pdfFile = 'book1.pdf';

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleAudio, setVisibleAudio] = useState(null);
    const [showGuidance, setShowGuidance] = useState(false);
    const [mobile, setMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 768);
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
            <div style={{ padding: '20px', backgroundColor: '#ffdddd', color: '#d8000c', border: '1px solid #d8000c', borderRadius: '5px' }}>
                <p>This page is only available on a computer browser.</p>
            </div>
        )
    }



    return (
        <div className="flex flex-col h-screen mb-[200px]">
            {/* Header */}
            <div className="w-full p-4 border-b border-gray-300 dark:border-gray-800">
                <div className="relative">
                    <div className="flex justify-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">"Polski Krok po Kroku" Study Emulator</h1>
                        <div className="flex items-center space-x-2">

                            <Chip variant="ghost" value="New" size="sm" color="green" className="rounded-full dark:text-gray-300" />
                            <Chip variant="ghost" value="Beta" size="sm" color="red" className="rounded-full dark:text-gray-300" ></Chip>


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
                        <Progress value={progress} variant="gradient" />
                    </div>
                    {currentChapter ? (
                        <Card className="bg-white p-4 dark:bg-gray-900 rounded-lg shadow-md mb-4">
                            <div className="relative">
                                <Typography className="text-4xl font-bold mb-2 text-lwr-blue-color-500 dark:text-lwr-blue-color-20">
                                    {currentChapter.name}
                                </Typography>
                            </div>
                            <Typography className="text-lg font-bold mb-4 text-lwr-blue-color-500 dark:text-lwr-blue-color-20">
                                {currentChapter.description}
                            </Typography>
                            <Typography className="text-md mb-4 font-medium text-lwr-blue-color-500 dark:text-lwr-blue-color-20">
                                Total number of audios: <span className="font-bold text-blue-600">{totalAudios}</span>
                            </Typography>
                            {audioMap[currentPage]?.length ? (
                                audioMap[currentPage].map((audioSrc, index) => {
                                    const audioLabel = audioSrc.split('/').pop().split('.').shift();
                                    return (
                                        <div
                                            key={index}
                                            className="mb-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm cursor-pointer transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            onClick={() => toggleAudio(index)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <Typography
                                                    variant="lead"
                                                    className="text-sm font-medium text-gray-800 dark:text-white"
                                                >
                                                    {audioLabel}
                                                </Typography>
                                                <button
                                                    className="text-blue-500 hover:underline focus:outline-none"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleAudio(index);
                                                    }}
                                                >
                                                    {visibleAudio === index ? 'Hide' : 'Show'}
                                                </button>
                                            </div>
                                            <AudioPlayer audioSrc={audioSrc} visible={visibleAudio === index} />
                                        </div>
                                    );
                                })
                            ) : (
                                <Typography className='text-lwr-blue-color-500 dark:text-lwr-blue-color-20'>No audio tasks for this page.</Typography>
                            )}
                        </Card>
                    ) : (
                        <Typography className='text-lwr-blue-color-500 dark:text-lwr-blue-color-20'>No chapter information available for this page.</Typography>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
