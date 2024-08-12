'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";


import Image from "next/image";
import empty from "@/public/imgs/empty.png"
import SignInWindow from '@/components/SignInWindow';

import CoursesGrid from '@/components/CoursesGrid';


import {
    Button,
} from "@material-tailwind/react";

import { AddPhoneNumber, AddWorkTitle, AddAboutMe, UpdateStatus } from '@/components/UserProfileUtils'

import 'react-phone-number-input/style.css'
import coursesData from '@/public/courses.json'

const StatusBadge = ({ status }) => {
    const bgColor = status === 'student' ? 'bg-green-500' : 'bg-red-500';
    return (
        <span className={`absolute bottom-0 right-0 px-2 py-1 text-xs font-bold text-white rounded-full ${bgColor}`}>
            {status}
        </span>
    );
};

export default function Profile() {
    const { data: session, update } = useSession();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [profileData, setProfileData] = useState({
        phone: '',
        worktitle: '',
        about: '',
        userStatus: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (session && session.user) {
            const { phone, worktitle, about, userStatus } = session.user;
            setProfileData({ phone, worktitle, about, userStatus });
            const user_courses = session.user?.courses;

            user_courses && setSelectedCourses(coursesData.filter(course => user_courses.includes(course.id)));
        }
    }, [session]);

    if (!session) {
        return (
            <div className="flex items-center justify-center bg-gray-100">
                <SignInWindow message={'Please, sign-in to continue'}
                    image_path={'/imgs/login_1.png'}
                    width={"100px"} />
            </div>
        );
    }

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData), // Send all updated profile data
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(`Error: ${data.error || 'An unknown error occurred'}`);
            } else {
                setMessage(data.message || 'Update successful');
                console.log(data.message)
                await update();
            }
        } catch (error) {
            setMessage('Error updating data');
        }

    }


    return (

        <>
            <div className="bg-gradient-to-r from-[#e7cfbe] to-[#bec4d9] dark:bg-gradient-to-r dark:from-[#e7cfbe5f] dark:to-[#bec4d964] ">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6">
                        <div className="col-span-4 sm:col-span-4">
                            <div className={`bg-white shadow rounded-lg p-6`}>
                                <div className="flex flex-col items-center">
                                    {(session.user.userStatus === 'parent' || !session.user.userStatus) && (
                                        <UpdateStatus
                                            value={profileData.userStatus}
                                            onChange={(newValue) => setProfileData((prev) => ({ ...prev, userStatus: newValue }))}
                                        />
                                    )}

                                    <div className="relative">
                                        <img
                                            src={session.user.image || '/default-avatar.png'}
                                            alt="User Avatar"
                                            className="w-32 h-32 rounded-full border-2 border-gray-300"
                                        />
                                        <StatusBadge status={session.user.userStatus} />
                                    </div>
                                    <h1 className="text-xl font-bold">{session.user.name}</h1>
                                    <AddWorkTitle
                                        value={profileData.worktitle}
                                        onChange={(newValue) => setProfileData((prev) => ({ ...prev, worktitle: newValue }))}
                                    />
                                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                        <Button variant="filled" size="sm" onClick={() => signOut({ callbackUrl: '/' })} color="red">
                                            Sign out
                                        </Button>
                                        <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                                    </div>
                                </div>
                                <hr className="my-6 border-t border-gray-300" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Contacts:</span>
                                    <ul>
                                        <li className="mb-2"><b>Phone:</b> {<AddPhoneNumber
                                            value={profileData.phone}
                                            onChange={(newValue) => setProfileData((prev) => ({ ...prev, phone: newValue }))}
                                        />}</li>
                                        <li className="mb-2"><b>Email:</b> {session.user.email}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-span-8">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">About Me</h2>
                                <AddAboutMe
                                    value={profileData.about}
                                    onChange={(newValue) => setProfileData((prev) => ({ ...prev, about: newValue }))}
                                />
                                {selectedCourses.length === 0 ?
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-xl font-bold mt-6 mb-4"> No courses added</h2>
                                        <Image src={empty} width={200} height={200} />
                                    </div>
                                    :
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-xl font-bold mt-6 mb-4">{`Selected courses (${selectedCourses.length})`}</h2>
                                        <CoursesGrid specificCourses={selectedCourses} cardsPerPage={3} />
                                    </div>
                                }

                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleSaveChanges}
                                        size="sm"
                                        className="text-xs bg-lwr-orange-color-100 px-3 py-1 rounded-md hover:bg-lwr-orange-color-200 mt-4"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                                {message && <p className="text-xs text-red-600 ml-2">{message}</p>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};
