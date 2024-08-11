'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";


import Image from "next/image";
import empty from "@/public/imgs/empty.png"
import SignInWindow from '@/components/SignInWindow';

import CoursesGrid from '@/components/CoursesGrid';

const ColorMap = {
    'student': 'green',
    'parent': 'lwr-blue'
}

import { AddPhoneNumber, AddWorkTitle, AddAboutMe, UpdateStatus } from '@/components/UserProfileUtils'

import 'react-phone-number-input/style.css'
import coursesData from '@/public/courses.json'

export default function Profile() {
    const { data: session } = useSession();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (session && session.user?.courses) {
            const user_courses = session.user?.courses;
            setSelectedCourses(coursesData.filter(course => user_courses.includes(course.id)));
            setLoading(false);
        }
    }, [])

    console.log(selectedCourses)
    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <SignInWindow message={'Please, sign-in to continue'}
                    image_path={'/imgs/login_1.png'}
                    width={"100px"} />
            </div>
        );
    }

    return (

        <>
            <div class="bg-gray-100">
                <div class="container mx-auto py-8">
                    <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div class="col-span-4 sm:col-span-3">
                            <div class={`bg-${session.user.userStatus ? ColorMap[session.user.userStatus] : 'white'}-100 shadow rounded-lg p-6`}>
                                <div class="flex flex-col items-center">
                                    <UpdateStatus />
                                    <img
                                        src={session.user.image || '/default-avatar.png'}
                                        alt="User Avatar"
                                        className="w-32 h-32 rounded-full border-2 border-gray-300"
                                    />

                                    <h1 class="text-xl font-bold">{session.user.name}</h1>
                                    <AddWorkTitle />
                                    <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                        <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                                        <a href="#" class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                                    </div>
                                </div>
                                <hr class="my-6 border-t border-gray-300" />
                                <div class="flex flex-col">
                                    <span class="text-gray-700 uppercase font-bold tracking-wider mb-2">Contacts:</span>
                                    <ul>
                                        <li class="mb-2"><b>Phone:</b> {<AddPhoneNumber />}</li>
                                        <li class="mb-2"><b>Email:</b> {session.user.email}</li>
                                        <li class="mb-2">Node.js</li>
                                        <li class="mb-2">HTML/CSS</li>
                                        <li class="mb-2">Tailwind Css</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-4 sm:col-span-9">
                            <div class="bg-white shadow rounded-lg p-6">
                                <h2 class="text-xl font-bold mb-4">About Me</h2>
                                <p class="text-gray-700 break-words overflow-auto">
                                    <AddAboutMe />
                                </p>
                                {selectedCourses.length === 0 ?
                                    <div className="flex flex-col items-center">
                                        <h2 class="text-xl font-bold mt-6 mb-4"> No courses added</h2>
                                        <Image src={empty} width={200} height={200} />
                                    </div>
                                    :
                                    <div className="flex flex-col items-center">
                                        <h2 class="text-xl font-bold mt-6 mb-4">{`Selected courses (${selectedCourses.length})`}</h2>
                                        <CoursesGrid specificCourses={selectedCourses} cardsPerPage={3} />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}
