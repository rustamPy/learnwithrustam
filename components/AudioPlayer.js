'use client';
import { useState } from 'react';
import { Typography, Card, Button } from '@material-tailwind/react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = ({ audioMap, currentPage, visibleAudio, toggleAudio }) => {
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [loop, setLoop] = useState(false);

    const currentPageAudios = audioMap[currentPage] || [];

    return (
        <Card className="bg-white p-4 dark:bg-gray-900 rounded-lg shadow-md mb-4">
            {currentPageAudios.length > 0 ? (
                <>
                    <Typography variant="h5" className="mb-4 text-gray-800 dark:text-gray-200">
                        Audio Tasks for Page {currentPage}
                    </Typography>
                    <div className="space-y-4">
                        {currentPageAudios.map((audioSrc, index) => {
                            const audioLabel = audioSrc.split('/').pop().split('.').shift();
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm cursor-pointer"
                                    onClick={() => toggleAudio(index)}
                                >
                                    <div className="flex items-center justify-between" >
                                        <Typography
                                            variant="h6"
                                            className="font-medium text-gray-800 dark:text-gray-200"
                                        >
                                            {audioLabel}
                                        </Typography>
                                        <Button
                                            size="sm"
                                            variant="text"
                                            color="blue"
                                            onClick={() => toggleAudio(index)}
                                        >
                                            {visibleAudio === index ? 'Hide' : 'Show'}
                                        </Button>
                                    </div>
                                    <AnimatePresence>
                                        {visibleAudio === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <audio
                                                    src={audioSrc}
                                                    controls
                                                    loop={loop}
                                                    style={{ width: '100%' }}
                                                    autoPlay={true}
                                                >
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <Typography className='text-lwr-blue-color-500 dark:text-lwr-blue-color-20'>
                    No audio tasks available for this page.
                </Typography>
            )}
        </Card>
    );
};

export default AudioPlayer;