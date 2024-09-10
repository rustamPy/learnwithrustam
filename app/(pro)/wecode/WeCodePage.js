'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Table from './Table';
import GroupCard from './GroupCard';
import WeCodeStats from './WeCodeStats';
import { Typography } from '@material-tailwind/react';
import WeCodeLogo from '@/components/pro/WeCodeLogo'

const Page = ({ questions, topGroups, stats }) => {
    const [isContentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const welcomeStatus = localStorage.getItem('welcome-we-code') === 'true';
            setContentVisible(welcomeStatus);

            setTimeout(() => {
                const targetElement = document.getElementById('start');
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: targetPosition - 100,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }

    }, []);

    const handleGetStartedClick = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('welcome-we-code', 'true');
            setContentVisible(true);

            setTimeout(() => {
                const targetElement = document.getElementById('start');
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: targetPosition - 100,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    return (
        <div className="flex flex-col items-center py-4 mt-16">
            <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8">
                    <h2 className="text-lg font-semibold text-lwr-orange-color-200 dark:text-lwr-orange-color-100 tracking-wide uppercase">Check the solutions Today</h2>
                    <div className="relative inline-flex items-center justify-center text-[300px]">
                        <WeCodeLogo size={100} />
                    </div>
                    <Typography className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-xl lg:text-4xl">
                        Data Structure and Algorithmic
                        <span className="px-2 py-1 relative inline-block">
                            <svg className="stroke-current bottom-0 absolute text-blue-300 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                            </svg>
                            <span className="relative">Solutions</span>
                        </span>
                    </Typography>
                    <button onClick={handleGetStartedClick} className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:from-lwr-orange-color-100 dark:to-lwr-blue-color-500 dark:hover:from-lwr-orange-color-200 dark:hover:to-lwr-blue-color-600 inline-block px-8 py-4 mt-8 text-white font-semibold rounded-2xl`}>
                        {!isContentVisible ? 'Get Started' : 'Welcome'}
                    </button>

                </div>
            </section>

            <AnimatePresence>
                <div id="start" className="w-full">
                    {isContentVisible && (
                        <>
                            <motion.div
                                key="stats"
                                initial={{ opacity: 0, y: 200 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{ duration: 1 }}
                                className='w-full'
                            >
                                <WeCodeStats stats={stats} />
                            </motion.div>
                            <motion.div
                                key="groupCard"
                                initial={{ opacity: 0, y: 200 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{ duration: 1 }}
                                className='w-full'
                            >
                                <GroupCard groups={topGroups} />
                            </motion.div>
                            <motion.div
                                key="table"
                                id="table"
                                initial={{ opacity: 0, y: 200 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{ duration: 1 }}
                                className='w-full'
                            >
                                <Table questions={questions} />
                            </motion.div>
                        </>
                    )}
                </div>
            </AnimatePresence>
        </div>
    );
}

export default Page;
