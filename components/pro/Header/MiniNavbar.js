'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import WeCodeLogo from '@/components/pro/WeCodeLogo';

import { fetchAllQuestions } from '@/app/(pro)/wecode/utils';

import { Tooltip, Spinner } from '@material-tailwind/react';
import ThemeToggle from '@/components/pro/ThemeToggle';

import { FaRegClock } from "react-icons/fa6";
import { HiOutlineRefresh, HiOutlinePlay, HiOutlinePause, HiOutlineArrowRight } from "react-icons/hi";
import { PiLineVertical } from 'react-icons/pi';

import { CgEye } from "react-icons/cg";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";

import { MdClose } from "react-icons/md";

import { COLOR_MAP } from '@/app/(pro)/wecode/utils'
import { MdFormatListNumbered } from "react-icons/md";

import Link from 'next/link';

import { Navbar, Drawer, Typography, IconButton } from '@material-tailwind/react';

const UserProfile = ({ user }) => (
    <div className="flex items-center">
        <a href="/profile">
            <img src={user?.image} width={30} className="rounded-full" alt="User Profile" />
        </a>
    </div>
);

const QuestionList = ({ open, setOpen, questions, pathname }) => {
    const closeDrawer = () => setOpen(false);
    const [showTopics, setShowTopics] = useState(false);

    return (
        <Fragment>
            <Drawer size={600} open={open} onClose={closeDrawer} className="p-4">
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <Typography className="font-bold text-xl text-gray-900">
                            <div className='flex flex-row items-center'>
                                <Link href={'/wecode'}> Problem List </Link>
                                <RiArrowRightWideFill className='ml-2' />
                            </div>
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                            <MdClose size={20} />
                        </IconButton>
                    </div>

                    <hr />

                    {/* Show/Hide Topics */}
                    <div className="flex justify-end mb-4 mt-4 cursor-pointer">
                        <div className="rounded-lg max-w-max p-1 bg-gray-50 hover:bg-gray-100">
                            <button onClick={() => setShowTopics(!showTopics)} className='text-sm'>
                                {showTopics ?
                                    <div className='flex items-center'>
                                        Hide Topics
                                        <RiEyeCloseLine className='ml-2' />
                                    </div>
                                    :
                                    <div className='flex items-center'>
                                        Show Topics
                                        <CgEye className='ml-2' />
                                    </div>}
                            </button>
                        </div>
                    </div>

                    {/* Questions list */}
                    {questions.map(q => (
                        <div
                            key={`${q.slug}-${q.title}`}
                            className={`text-sm font-semibold p-3 rounded-lg mb-2 ${pathname === `/wecode/${q.slug}` ? 'bg-gray-900 text-gray-50' : 'bg-gray-100 text-gray-800'} transition-colors`}
                        >
                            <Link href={`/wecode/${q.slug}`}>
                                <div className='flex justify-between'>
                                    <div className="flex flex-col">
                                        {q.slug}. {q.title}
                                        {showTopics && (
                                            <div className="flex flex-row rounded-lg py-1">
                                                {q.topics?.map((topic, idx) => (
                                                    <div key={`${q.slug}-${q.title}-${topic}`} className="text-[11px] rounded-full px-2 bg-gray-100 text-gray-800 mr-1 ml-1 mt-1">
                                                        {topic}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-${COLOR_MAP[q.level]}`}>
                                        {q.level}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </Drawer>
        </Fragment>
    );
};


const QuestionIteration = ({ questions, pathname }) => {
    const findCurrentIndex = () => {
        for (let i = 0; i < questions.length; i++) {
            if (`/wecode/${questions[i].slug}` === pathname) {
                return i;
            }
        }
        return -1;
    };

    const [iteration, setIteration] = useState(0);

    useEffect(() => {
        const currentIdx = findCurrentIndex();
        setIteration(currentIdx);
    }, [pathname, questions]);

    const getPreviousQuestionSlug = () => {
        return questions[(iteration - 1 + questions.length) % questions.length]?.slug || '';
    };

    const getNextQuestionSlug = () => {
        return questions[(iteration + 1) % questions.length]?.slug || '';
    };

    return (
        <div className='flex flex-row items-center'>
            <Link href={`/wecode/${getPreviousQuestionSlug()}`}>
                <RiArrowLeftWideFill className='mr-2 cursor-pointer' />
            </Link>
            <Link href={`/wecode/${getNextQuestionSlug()}`}>
                <RiArrowRightWideFill className='cursor-pointer' />
            </Link>
        </div>
    );
};





const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


const MiniNavbar = ({
    isTimerVisible,
    setIsTimerVisible,
    timer,
    runCode,
    isRunning,
    isTimerRunning,
    handleStartStopTimer,
    handleResetTimer
}) => {
    const { data: session } = useSession();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);

    useEffect(() => {   
        const getData = async () => {
            try {
                const data = await fetchAllQuestions();
                setQuestions(data.questions.map(q => q.question));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
        setLoading(false)
    }, []);

    const pathname = usePathname();
    const route = useRouter();


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar className='max-w-full py-0 rounded-none shadow-none z-10 dark:bg-[#131313] border-none mt-[5px] mb-[4px]'>
                <div className="flex flex-row items-center justify-between w-full">
                    {/* Left Side */}
                    <div className="flex flex-row items-center text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color">
                        <WeCodeLogo />
                        <PiLineVertical className='text-gray-300 dark:text-gray-500' />

                        <div className='flex items-center ml-2'>
                            <MdFormatListNumbered className='mr-1' />
                            <button onClick={() => setOpen(true)} className='text-sm font-semibold'>
                                Problem List
                            </button>
                        </div>
                        <PiLineVertical className='text-gray-300 dark:text-gray-500' />
                        <QuestionIteration questions={questions} pathname={pathname} />
                    </div>

                    {/* Centered Run and Timer Controls */}
                    <div className="flex flex justify-center items-center">
                        <div className="flex items-center space-x-2 dark:bg-gray-800 bg-gray-100 px-4 py-1 rounded-xl">
                            {/* Timer Control Section */}
                            <div className="flex items-center space-x-2">
                                {/* Toggle Timer Visibility */}
                                <Tooltip content="Open the timer" placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                    <div className="relative inline-flex items-center">
                                        {isTimerRunning &&


                                            <span className="absolute flex h-[13px] w-[13px] top-[1.5px] right-[1.5px]">
                                                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-red-900 dark:bg-green-300 opacity-10"></span>
                                            </span>
                                        }

                                        <button
                                            onClick={() => setIsTimerVisible(!isTimerVisible)}
                                            className="text-gray-800 dark:text-gray-50 hover:text-gray-900 dark:hover:text-gray-200 relative"
                                        >
                                            {isTimerVisible ? (
                                                <HiOutlineArrowRight />
                                            ) : (
                                                <FaRegClock className={`text-gray-800 dark:text-green-300`} />
                                            )}
                                        </button>
                                    </div>
                                </Tooltip>
                                {isTimerVisible && (
                                    <>
                                        <button onClick={handleStartStopTimer} className="text-gray-800 dark:text-gray-50 hover:text-gray-900 dark:hover:text-gray-200">
                                            {!isTimerRunning ? <HiOutlinePlay /> : <HiOutlinePause />}
                                        </button>
                                        <p className="text-red-500 dark:text-red-500 font-mono">{formatTime(timer)}</p>
                                        <button onClick={handleResetTimer} className="text-xl text-gray-800 dark:text-gray-50 hover:text-gray-900 dark:hover:text-gray-200">
                                            <HiOutlineRefresh />
                                        </button>
                                    </>
                                )}
                            </div>

                            <PiLineVertical className="text-gray-300 dark:text-gray-500" />

                            <div className="flex items-center">
                                <Tooltip content="Run the code" placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                    <button
                                        className="flex items-center rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-50 dark:hover:text-gray-400 dark:hover:bg-gray-700"
                                        onClick={runCode}
                                    >
                                        <span className="dark:text-green-300 px-2 font-semibold">{!isRunning ? <div className='flex flex-row items-center'> <HiOutlinePlay className="cursor-pointer mr-1" /> Run code</div> : <div className='flex flex-row items-center'> <Spinner className='h-4 w-4 mr-2' /> Running </div>}</span>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center">
                        {session ? (
                            <UserProfile user={session.user} />
                        ) : (<div className='rounded-full w-8 h-8 bg-gray-100 text-xs text-black'> .... </div>)}
                        <ThemeToggle />
                    </div>
                </div>
            </Navbar>
            <QuestionList open={open} setOpen={setOpen} questions={questions} pathname={pathname} />
        </>
    );
};


export default MiniNavbar;