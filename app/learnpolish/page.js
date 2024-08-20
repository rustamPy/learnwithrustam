'use client';
import { useState } from 'react';
import PdfViewer from '@/components/PdfViewer';
import AudioPlayer from '@/components/AudioPlayer';
import { Typography, Card, Progress } from '@material-tailwind/react';


import { audioMap, chapterMap } from './data'

const pdfFile = 'book1.pdf'; // Path to your PDF file



const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleAudio, setVisibleAudio] = useState(null);

    const totalPages = 171; // Replace with actual total pages
    const progress = (currentPage / totalPages) * 100;

    const handlePageChange = ({ currentPage }) => {
        setCurrentPage(currentPage);
        setVisibleAudio(null); // Reset visible audio on page change
    };

    const toggleAudio = (index) => {
        setVisibleAudio(visibleAudio === index ? null : index);
    };

    const currentChapter = chapterMap.find(
        (chapter) => currentPage >= chapter.range[0] && currentPage <= chapter.range[1]
    );

    // Calculate the total number of audios for the current chapter
    const totalAudios = currentChapter
        ? chapterMap.reduce((total, chapter) => {
            if (chapter.range[0] >= currentChapter.range[0] && chapter.range[1] <= currentChapter.range[1]) {
                return total + Object.values(audioMap).slice(chapter.range[0], chapter.range[1] + 1).flat().length;
            }
            return total;
        }, 0)
        : 0;

    return (
        <div className="flex h-screen">

            <div className="flex-[3] border-r border-gray-300 dark:border-gray-800 p-4">
                <PdfViewer fileUrl={pdfFile} onPageChange={handlePageChange} />
            </div>
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
                        <Typography className="text-4xl font-bold mb-2 text-lwr-blue-color-500 dark:text-lwr-blue-color-20">{currentChapter.name}</Typography>
                        <Typography className="text-lg font-bold  mb-4 text-lwr-blue-color-500 dark:text-lwr-blue-color-20">{currentChapter.description}</Typography>
                        <Typography className="text-md mb-4 font-medium text-lwr-blue-color-500 dark:text-lwr-blue-color-20">Total number of audios: <span className="font-bold text-blue-600">{totalAudios}</span></Typography>
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
    );
};

export default Page;
