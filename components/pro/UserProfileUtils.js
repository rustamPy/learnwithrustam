'use client';

import React from 'react';
import PhoneInput from 'react-phone-number-input';
import { useSession } from 'next-auth/react';
import { StatusSelect } from '@/components/pro/StatusSelect';
import { TbHandClick } from "react-icons/tb";

import 'react-phone-number-input/style.css'; // Import the default styles

const EditableField = ({ fieldKey, placeholder, inputType = 'line', onChange, val, isEditing, setIsEditing }) => {
    const { data: session } = useSession();
    const handleFieldClick = () => {
        setIsEditing(!isEditing); // Enable editing mode when field is clicked
    };

    return (
        <>
            {!isEditing && session?.user?.[fieldKey] ?
                <span onClick={handleFieldClick} className="cursor-pointer break-words overflow-auto">
                    {fieldKey !== 'userStatus' ? session.user[fieldKey] : <div className='mb-4'>Click here update your profile (only for parents) </div>}
                </span>
                : (
                    fieldKey === 'phone' ? (
                        <>
                            <PhoneInput
                                value={val}
                                onChange={onChange}
                                placeholder={placeholder}
                                className='bg-lwr-orange-color-20 dark:bg-lwr-gray-color-200 rounded px-2 py-2'
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
                                    className='w-full bg-lwr-orange-color-20 dark:bg-lwr-gray-color-200 rounded px-2 py-2'
                                />
                            ) : (
                                <input
                                    type="text"
                                    placeholder={placeholder}
                                    value={val}
                                    onChange={(e) => onChange(e.target.value)}
                                    className='bg-lwr-orange-color-20 dark:bg-lwr-gray-color-200 rounded px-2 py-2 text-center'
                                />
                            )}
                        </>
                    )
                )}

        </>
    );
};

export const AddPhoneNumber = ({ value, onChange, isEditing, setIsEditing }) => (
    <EditableField
        fieldKey="phone"
        placeholder="Enter phone number"
        onChange={onChange}
        val={value}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
    />
);
export const AddWorkTitle = ({ value, onChange, isEditing, setIsEditing }) => (
    <EditableField
        fieldKey="worktitle"
        placeholder="Enter work title"
        onChange={onChange}
        val={value}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
    />
);
export const AddAboutMe = ({ value, onChange, isEditing, setIsEditing }) => (
    <EditableField
        fieldKey="about"
        inputType="text"
        placeholder="Enter about me title"
        onChange={onChange}
        val={value}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
    />
);
export const UpdateStatus = ({ value, onChange, isEditing, setIsEditing }) => (
    <EditableField
        fieldKey="userStatus"
        inputType="statusMenu"
        placeholder="Choose your status"
        onChange={onChange}
        val={value}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
    />
);
