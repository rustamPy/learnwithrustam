'use client';

import React, { useState, useEffect } from 'react';
import { badge, Button } from '@material-tailwind/react';
import PhoneInput from 'react-phone-number-input';
import { useSession } from 'next-auth/react';
import { FaEdit } from 'react-icons/fa';
import { StatusSelect } from '@/components/StatusSelect';

import { AttentionWindow } from '@/components/AttentionWindow'

import 'react-phone-number-input/style.css'; // Import the default styles

const EditableField = ({ fieldKey, apiEndpoint, placeholder, inputType = 'line' }) => {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { data: session, update } = useSession();
    const [isAttentionWindowOpen, setIsAttentionWindowOpen] = useState(false);

    console.log(`VALUE ${value}`)

    useEffect(() => {
        if (session?.user?.[fieldKey]) {
            setValue(session.user[fieldKey]); // Initialize value with existing data
            setIsEditing(false); // Initialize edit mode to false
        }
    }, [session, fieldKey]);

    const handleSubmit = async (newValue = undefined, event = undefined) => {
        if (event) {
            event.preventDefault();
        }
        const valueToSubmit = newValue !== undefined ? newValue : value;

        if (session?.user?.userStatus === 'student' && fieldKey === 'userStatus' && valueToSubmit !== 'student') {
            setIsAttentionWindowOpen(true);
            await update(); // Refetch session data
            return;
        }
        try {
            const response = await fetch(apiEndpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [fieldKey]: valueToSubmit }), // Use dynamic field key
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(`Error: ${data.error || 'An unknown error occurred'}`);
            } else {
                setMessage(data.message || 'Update successful');
                await update(); // Refetch session data
                setIsEditing(false); // Exit edit mode
            }
        } catch (error) {
            setMessage('Error updating data');
        }
    };

    // Convert field key to a human-readable format for display purposes

    return (
        <>
            {isAttentionWindowOpen && (
                <AttentionWindow
                    title="Warning"
                    content="Unauthorized status change"
                    onClose={() => setIsAttentionWindowOpen(false)}
                />
            )}
            <>
                {fieldKey === 'userStatus' ?

                    <>
                        <form className="flex items-center space-x-2 mt-1">
                            <StatusSelect
                                placeholder={placeholder}
                                value={value}
                                onChange={setValue}
                                onSubmit={handleSubmit}
                                locked={session.user.userStatus} />
                            {message && <p className="text-xs text-red-600 ml-2">{message}</p>}
                        </form>

                    </> :
                    session?.user?.[fieldKey] ? (
                <>
                    <>
                        {session.user[fieldKey]}
                    </> {' '}
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-lwr-orange-100 hover:text-lwr-orange-200"
                    >
                        <FaEdit className="h-3 w-3" />
                    </button>
                </>
            ) : (
                <p className="text-xs dark:text-white">
                    <i>Please, add your {fieldKey} (optional):</i>
                </p>
            )}

            {(isEditing || !session?.user?.[fieldKey]) && (
                fieldKey === 'phone' ? (
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-1">
                        <PhoneInput
                            value={value}
                            onChange={setValue}
                            placeholder={placeholder}
                            className="text-xs h-8 w-48 input"
                        />
                        {inputType !== 'statusMenu' && ( // Conditionally render the button
                            <Button
                                type="submit"
                                size="sm"
                                className="text-xs bg-lwr-orange-100 px-3 py-1 rounded-md hover:bg-lwr-orange-200"
                            >
                                {session?.user?.[fieldKey] ? 'Update' : 'Add'}
                            </Button>
                        )}
                        {message && <p className="text-xs text-red-600 ml-2">{message}</p>}
                    </form>
                    ) :
                        inputType === 'statusMenu' ? (
                            <form className="flex items-center space-x-2 mt-1">
                        <StatusSelect
                            placeholder={placeholder}
                            value={value}
                            onChange={setValue}
                            onSubmit={handleSubmit} />
                        {message && <p className="text-xs text-red-600 ml-2">{message}</p>}
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-1">
                        {inputType === 'text' ? (
                            <textarea
                                id="w3review"
                                name="w3review"
                                rows="4" cols="50"
                                placeholder={placeholder}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        ) : (
                            <input
                                type="text"
                                placeholder={placeholder}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="text-xs h-8 w-48 input"
                            />
                        )}
                        {inputType !== 'statusMenu' && ( // Conditionally render the button
                            <Button
                                type="submit"
                                size="sm"
                                className="text-xs bg-lwr-orange-100 px-3 py-1 rounded-md hover:bg-lwr-orange-200"
                            >
                                {session?.user?.[fieldKey] ? 'Update' : 'Add'}
                            </Button>
                        )}
                        {message && <p className="text-xs text-red-600 ml-2">{message}</p>}
                    </form>
                )
            )}
        </>
        </>
    );
};

export const AddPhoneNumber = () => (
    <EditableField
        fieldKey="phone"
        apiEndpoint="/api/user/profile"
        placeholder="Enter phone number"
    />
);

export const AddWorkTitle = () => (
    <EditableField
        fieldKey="worktitle"
        apiEndpoint="/api/user/profile"
        placeholder="Enter work title"
    />
);

export const AddAboutMe = () => (
    <EditableField
        fieldKey="about"
        inputType="text"
        apiEndpoint="/api/user/profile"
        placeholder="Enter about me title"
    />
);

export const UpdateStatus = () => (
    <EditableField
        fieldKey="userStatus"
        inputType="statusMenu"
        apiEndpoint="/api/user/profile"
        placeholder="Choose your status"
    />
);
