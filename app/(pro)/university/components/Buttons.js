'use client';
import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const Buttons = () => {

    const [count, setCount] = useState(0);
    const date = new Date();

    const IconComponent = ({ icon, ...props }) => {
        const LucideIcon = Icons[icon];
        if (LucideIcon) {
            return <LucideIcon {...props} />;
        }
        return <span>Icon not found</span>;
    };

    return (
        <>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Just a button</p>
                <button
                    title="Button without action"
                    type="button"
                    className="w-max bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-blue-600 w-64 transition duration-200 ease-in-out"
                >
                    Just click without action
                </button>
            </div>

            <div className='flex flex-col mr-8  mb-4'>
                <p className='mb-2 dark:text-gray-300'>Button with counter</p>
                <div className='flex justify-left'>
                    <input
                        value={count}
                        disabled
                        className="mr-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-md px-2 py-1 w-16 text-center"
                    />
                    <button
                        onClick={() => setCount(count + 1)}
                        type="button"
                        title="Increase count"
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 dark:bg-gray-700 dark:hover:bg-orange-500 transition duration-200 ease-in-out mr-2"
                    >
                        <IconComponent icon={'ChevronUp'} className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCount(count - 1)}
                        type="button"
                        title="Decrease count"
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-red-600 dark:bg-gray-600 dark:hover:bg-red-500 transition duration-200 ease-in-out mr-2"
                    >
                        <IconComponent icon={'ChevronDown'} className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCount(0)}
                        type="button"
                        title="Reset count"
                        className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        <IconComponent icon={'RotateCcw'} className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Button to pop-up alert</p>
                <button
                    title="Show date"
                    onClick={() => alert(`Hello there, today is ${date.toJSON().slice(0, 10)}`)}
                    type="button"
                    className="w-max bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                    What date is today?
                </button>
            </div>

            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Disabled Button</p>
                <button
                    title="Disabled"
                    type="button"
                    className="w-max bg-gray-300 text-gray-600 px-3 py-1 rounded-md dark:bg-gray-700"
                    disabled
                >
                    Disabled
                </button>
            </div>
        </>
    )
}

export const ButtonsCode = () => `'use client';
// Uncomment 'use client' if you are using Next.js

import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const Buttons = () => {

    const [count, setCount] = useState(0);
    const date = new Date();

    const IconComponent = ({ icon, ...props }) => {
        const LucideIcon = Icons[icon];
        if (LucideIcon) {
            return <LucideIcon {...props} />;
        }
        return <span>Icon not found</span>;
    };

    return (
        <>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Just a button</p>
                <button
                    title="Button without action"
                    type="button"
                    className="w-max bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-blue-600 w-64 transition duration-200 ease-in-out"
                >
                    Just click without action
                </button>
            </div>

            <div className='flex flex-col mr-8  mb-4'>
                <p className='mb-2 dark:text-gray-300'>Button with counter</p>
                <div className='flex justify-left'>
                    <input
                        value={count}
                        disabled
                        className="mr-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-md px-2 py-1 w-16 text-center"
                    />
                    <button
                        onClick={() => setCount(count + 1)}
                        type="button"
                        title="Increase count"
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 dark:bg-gray-700 dark:hover:bg-orange-500 transition duration-200 ease-in-out mr-2"
                    >
                        <IconComponent icon={'ChevronUp'} className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCount(count - 1)}
                        type="button"
                        title="Decrease count"
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-red-600 dark:bg-gray-600 dark:hover:bg-red-500 transition duration-200 ease-in-out mr-2"
                    >
                        <IconComponent icon={'ChevronDown'} className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCount(0)}
                        type="button"
                        title="Reset count"
                        className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        <IconComponent icon={'RotateCcw'} className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Button to pop-up alert</p>
                <button
                    title="Show date"
                    onClick={() => alert(\`Hello there, today is \${ date.toJSON().slice(0, 10)}\`)}
                    type="button"
                    className="w-max bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                    What date is today?
                </button>
            </div>

            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Disabled Button</p>
                <button
                    title="Disabled"
                    type="button"
                    className="w-max bg-gray-300 text-gray-600 px-3 py-1 rounded-md dark:bg-gray-700"
                    disabled
                >
                    Disabled
                </button>
            </div>
        </>
    )
}

export default Buttons;
`

export default Buttons;