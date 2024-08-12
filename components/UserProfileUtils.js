'use client';

import React, { useState, useEffect } from 'react';
import { badge, Button } from '@material-tailwind/react';
import PhoneInput from 'react-phone-number-input';
import { useSession } from 'next-auth/react';
import { FaEdit } from 'react-icons/fa';
import { StatusSelect } from '@/components/StatusSelect';

import { AttentionWindow } from '@/components/AttentionWindow'

import 'react-phone-number-input/style.css'; // Import the default styles

const EditableField = ({ fieldKey, placeholder, inputType = 'line', onChange, val }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { data: session } = useSession();
    const [isAttentionWindowOpen, setIsAttentionWindowOpen] = useState(false);


    const handleFieldClick = () => {
        setIsEditing(true); // Enable editing mode when field is clicked
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
            {session?.user?.[fieldKey] ? (
                fieldKey === 'userStatus' ? (
                        <StatusSelect
                            placeholder={placeholder}
                        value={val}
                        onChange={onChange}
                            locked={session?.user?.userStatus}
                    />
                ) : (
                        <>
                        </>
                    )
            ) : (
                <p className="text-xs dark:text-white">
                    <i>Please, add your {fieldKey} (optional):</i>
                </p>
            )}

            {!isEditing && session?.user?.[fieldKey] ? (
                <div onClick={handleFieldClick} className="cursor-pointer break-words overflow-auto">
                    {session.user[fieldKey]}
                </div>) : (
                fieldKey === 'phone' ? (
                        <>
                        <PhoneInput
                                value={val}
                                onChange={onChange}
                            placeholder={placeholder}
                            className="text-xs h-8 w-48 input"
                        />
                        </>
                ) : inputType === 'statusMenu' ? (
                            <>
                        <StatusSelect
                            placeholder={placeholder}
                                    value={val}
                                    onChange={onChange}
                                    locked={session?.user?.userStatus}
                            />
                            </>
                ) : (
                                <>
                        {inputType === 'text' ? (
                            <textarea
                                id="w3review"
                                name="w3review"
                                            rows="4"
                                            cols="50"
                                placeholder={placeholder}
                                            value={val}
                                            onChange={(e) => onChange(e.target.value)}
                            />
                        ) : (
                            <input
                                type="text"
                                placeholder={placeholder}
                                                value={val}
                                                onChange={(e) => onChange(e.target.value)}
                                className="text-xs h-8 w-48 input"
                            />
                                    )}
                                </>
                )
            )}

        </>
    );
};

export const AddPhoneNumber = ({ value, onChange }) => (
    <EditableField
        fieldKey="phone"
        placeholder="Enter phone number"
        onChange={onChange}
        val={value}
    />
);

export const AddWorkTitle = ({ value, onChange }) => (
    <EditableField
        fieldKey="worktitle"
        placeholder="Enter work title"
        onChange={onChange}
        val={value}
    />
);

export const AddAboutMe = ({ value, onChange }) => (
    <EditableField
        fieldKey="about"
        inputType="text"
        placeholder="Enter about me title"
        onChange={onChange}
        val={value}
    />
);

export const UpdateStatus = ({ value, onChange }) => (
    <EditableField
        fieldKey="userStatus"
        inputType="statusMenu"
        placeholder="Choose your status"
        onChange={onChange}
        val={value}
    />
);
