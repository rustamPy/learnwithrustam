'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";


import {
    Typography,
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    Card
} from "@material-tailwind/react";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { CourseCard } from '@/components/Hero/SearchWindow'
import coursesData from '@/public/courses.json'

export default function Profile() {
    const { data: session, status, update } = useSession();
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([1, 2, 3, 4]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (session?.user?.phone) {
            setPhone(session.user.phone); // Initialize phone state with existing value if available
        }
    }, [session]);

    useEffect(() => {
        if (session.user?.courses) {
            const user_courses = session.user?.courses;
            setSelectedCourses(coursesData.filter(course => user_courses.includes(course.id)));
            setLoading(false);
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        try {
            // Send a PATCH request to update the phone number
            const response = await fetch("/api/user/profile/updatePhone", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone }), // Send the phone number in the request body
            });

            const data = await response.json();

            if (!response.ok) {
                // Set an error message if the response is not successful
                setMessage(`Error: ${data.error}`);
            } else {
                // Set a success message if the phone number is updated
                setMessage(data.message);

                // Refetch session data to update the UI
                await update(); // This line will trigger a session refetch
                setPhone(""); // Clear phone input field
            }
        } catch (error) {
            // Set an error message if an exception occurs
            setMessage("Error updating phone number");
        }
    };

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">You are not authenticated</h1>
                    <a href="/auth/signin" className="text-blue-500 hover:underline">
                        Sign In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-10 items-center justify-center min-h-screen bg-lwr-orange-100 m-10 rounded-lg">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <img
                        src={session.user.image || '/default-avatar.png'}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full border-2 border-gray-300"
                    />
                    <div className="ml-4">
                        <h1 className="text-3xl font-semibold text-gray-900">{session.user.name}</h1>
                        <p className="text-gray-600">{session.user.email}</p>
                    </div>
                </div>
                <ul className="list-disc list-inside mb-6">
                    <li className="text-lg font-medium text-gray-900">Name: {session.user.name}</li>
                    <li className="text-lg font-medium text-gray-900">Email: {session.user.email}</li>
                    {session.user?.phone ? (
                        <li className="text-lg font-medium text-gray-900">Phone: {session.user.phone}</li>
                    ) : (
                        <>
                            <p><i>Add missing phone number:</i></p>
                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center space-x-2"
                            >
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={setPhone} />
                                <Button
                                    type="submit"
                                    className="text-white bg-lwr-orange-100 px-5 py-1.5 text-sm font-bold rounded-md hover:bg-lwr-orange-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Add
                                </Button>
                                {message && (
                                    <p className="text-sm text-red-600 ml-4">{message}</p>
                                )}
                            </form>
                        </>
                    )}
                </ul>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Sign Out
                </button>
            </div>
            <div style={{ flexDirection: "column" }} className="p-6 flex items-center lg:mr-24 lg:ml-24">
                <Typography variant="h1" color="white">
                    Selected Courses:
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    {loading ?
                        selectedCourses.map(v => (
                            <div key={v} className="max-w-full animate-pulse">
                                <Card className="mt-6 animate-pulse w-64">
                                    <CardHeader
                                        shadow={false}
                                        floated={false}
                                        className="relative grid h-56 place-items-center bg-gray-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-12 text-gray-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                    </CardHeader>
                                    <CardBody>
                                        <Typography
                                            as="div"
                                            variant="h1"
                                            className="mb-4 h-3 rounded-full bg-gray-300"
                                        >
                                            &nbsp;
                                        </Typography>
                                        <Typography
                                            as="div"
                                            variant="paragraph"
                                            className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                        >
                                            &nbsp;
                                        </Typography>
                                        <Typography
                                            as="div"
                                            variant="paragraph"
                                            className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                        >
                                            &nbsp;
                                        </Typography>
                                        <Typography
                                            as="div"
                                            variant="paragraph"
                                            className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                        >
                                            &nbsp;
                                        </Typography>
                                        <Typography
                                            as="div"
                                            variant="paragraph"
                                            className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                        >
                                            &nbsp;
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                        <Button
                                            disabled
                                            tabIndex={-1}
                                            className="h-8 bg-gray-300 shadow-none hover:shadow-none"
                                        >
                                            &nbsp;
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))
                        :
                        selectedCourses.map(course => (
                            <div key={course.id} className="relative">
                                <CourseCard
                                    id={course.id}
                                    title={course.title}
                                    desc={course.desc}
                                    price={course.price}
                                    options={course.options}
                                />
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    );
}
