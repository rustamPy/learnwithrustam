'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import PhoneInput from 'react-phone-number-input';
import { useSession } from 'next-auth/react';
import { FaEdit } from 'react-icons/fa';

import 'react-phone-number-input/style.css'; // Import the default styles

const AddPhoneNumber = () => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { data: session, update } = useSession();

    useEffect(() => {
        if (session && session.user && session.user.phone) {
            setPhone(session.user.phone); // Initialize phone state with existing value if available
            setIsEditing(false); // Initialize edit mode to false
        }
    }, [session]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        try {
            // Send a PATCH request to update the phone number
            const response = await fetch('/api/user/profile/updatePhone', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
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
                setIsEditing(false); // Exit edit mode after successful update
            }
        } catch (error) {
            // Set an error message if an exception occurs
            setMessage('Error updating phone number');
        }
    };

    return (
        <div className="text-xs">
            {session?.user?.phone ? (
                <div className="flex items-center space-x-2">
                    <li className="text-lg font-medium text-gray-900">
                        Your phone number: {session.user.phone}
                    </li>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-lwr-orange-100 hover:text-lwr-orange-200"
                    >
                        <FaEdit className="h-3 w-3" />
                    </button>
                </div>
            ) : (
                <p className="text-xs"><i>Please, add your missing phone number:</i></p>
            )}

            {(isEditing || !session?.user?.phone) && (
                <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-1">
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        defaultCountry="AZ"
                        onChange={setPhone}
                        className="text-xs h-8 w-48 phone-input" // Add your custom class name here
                    />
                    <Button
                        type="submit"
                        size="sm"
                        className="text-xs bg-lwr-orange-100 px-3 py-1 rounded-md hover:bg-lwr-orange-200"
                    >
                        {session?.user?.phone ? 'Update' : 'Add'}
                    </Button>
                    {message && <p className="text-xs text-red-600 ml-2">{message}</p>}
                </form>
            )}
        </div>
    );
};

export default AddPhoneNumber;
