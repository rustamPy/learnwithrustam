'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import MiniLogo from '@/components/pro/MiniLogo';

import { CgEye } from "react-icons/cg";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";

import { MdClose } from "react-icons/md";

import { COLOR_MAP } from '@/app/(pro)/leetcode/utils'
import { MdFormatListNumbered } from "react-icons/md";



import { PiLineVertical } from 'react-icons/pi';

import Link from 'next/link';



import { fetchAllQuestions } from '@/app/(pro)/leetcode/utils';


import {
    Navbar,
    Drawer,
    Typography,
    IconButton,
} from '@material-tailwind/react';



const UserProfile = ({ user }) => (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <a href="/profile"><img src={user.user?.image} width={30} style={{ borderRadius: 50 }} /></a>
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
                                <Link href={'/leetcode'}> Problem List </Link>
                                <RiArrowRightWideFill className='ml-2' />
                            </div>
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                            <MdClose size={20} />
                        </IconButton>
                    </div>

                    <hr />

                    {/* Show/Hide */}
                    <div className={`flex justify-end mb-4 mt-4 cursor-pointer`}>
                        <div className={`rounded-lg max-w-max p-1 bg-gray-50 hover:bg-gray-100`}>
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
                            className={`text-[13px] text-gray-800 font-semibold ${pathname === `/leetcode/${q.slug}` ? 'bg-gray-900 text-gray-50' : 'text-gray-100'} p-2 rounded-lg`}
                        >
                            <Link href={`/leetcode/${q.slug}`}>
                                <div className='flex justify-between'>
                                    <div className={`flex flex-col`}>
                                        {q.slug}. {q.title}
                                        {showTopics && (
                                            <div className={`flex flex-row rounded-lg py-1`}>
                                                {q.topics?.map(q => {
                                                    return (
                                                        <div key={`${q.slug}-${q.title}-${q}`} className={`text-[11px] rounded-full px-2 bg-gray-100 text-gray-800 mr-1 ml-1 mt-1`}>
                                                            {q}
                                                        </div>
                                                    )
                                                })}
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
            if (`/leetcode/${questions[i].slug}` === pathname) {
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

    const handleForward = () => {
        if (iteration !== -1 && iteration < questions.length - 1) {
            setIteration(iteration + 1);
        }
    };

    const handleBackward = () => {
        if (iteration > 0) {
            setIteration(iteration - 1);
        }
    };

    return (
        <div className='flex'>
            <Link href={`/leetcode/${questions[iteration - 1]?.slug || ''}`}>
                <button onClick={handleBackward} className={'disabled:text-gray-400 mr-2'} disabled={iteration === 0}>
                    <RiArrowLeftWideFill />
                </button>
            </Link>
            <Link href={`/leetcode/${questions[iteration + 1]?.slug || ''}`}>
                <button onClick={handleForward} className={'disabled:text-gray-400 mr-2'} disabled={iteration === questions.length - 1}>
                    <RiArrowRightWideFill />
                </button>
            </Link>
        </div>
    );
};



const MiniNavbar = ({ children }) => {

    //const { data: session, status } = useSession();
    const [questions, setQuestions] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {

        const getData = async () => {
            try {
                const data = await fetchAllQuestions();
                setQuestions(data.questions)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();

    }, []);

    const pathname = usePathname();
    const route = useRouter()
    const goLight = () => {
        return '/light' + pathname
    }


    return (
        <>
            <Navbar className='max-w-full py-0 rounded-none shadow-none z-10'>  {/* Added z-index: 10 */}
                <div className="flex flex-row items-center text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color">
                    <MiniLogo />
                    <PiLineVertical className='text-gray-300 dark:text-gray-500' />
                    <div className='flex items-center hover:bg-gray-100 font-semibold rounded-xl mr-2 p-1'>
                        <MdFormatListNumbered className='mr-1' />
                        <button onClick={() => setOpen(true)} variant="text" className='text-sm' > Problem List </button>
                    </div>
                    <QuestionIteration questions={questions} pathname={pathname} />

                    {children}
                </div>
            </Navbar>
            <QuestionList open={open} setOpen={setOpen} questions={questions} pathname={pathname} />
        </>
    );
};

export default MiniNavbar;