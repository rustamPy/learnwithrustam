'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button } from "react-bootstrap";

export default function Profile() {
    const { data: session, status, update } = useSession();
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (session?.user?.phone) {
            setPhone(session.user.phone); // Initialize phone state with existing value if available
        }
    }, [session]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        try {
            // Send a PATCH request to update the phone number
            const response = await fetch("/api/user/profile", {
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

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p>Loading...</p>
            </div>
        );
    }

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
        <div className="flex items-center justify-center min-h-screen bg-lwr-orange-100 m-10 rounded-lg">
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
        </div>
    );
}
