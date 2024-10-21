import React from 'react';
import { Chip } from '@material-tailwind/react';
import { useState } from 'react';

import { RotateCcw } from 'lucide-react';

const Base = ({ title, date, level, children }) => {
    return (
        <div className="w-[90%] mx-auto p-6 rounded-lg">
            <header className="mb-4">
                <h1 className="text-3xl text-center font-bold text-gray-800">{title}</h1>
                <div className="flex justify-center mt-4">
                    <Chip variant="ghost" value={date} size="sm" color="green" className="rounded-full dark:text-gray-300 mr-4" />
                    <Chip variant="ghost" value={level} size="sm" color="green" className="rounded-full dark:text-gray-300" />
                </div>
            </header>
            <div className="space-y-6">{children}</div>
        </div>
    );
};

export const WPSC1 = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('')
    const date = new Date();

    const elements = {
        'Buttons': (
            <div className='flex flex-row'>
                <div className='flex flex-col mr-8'>
                    <p className='mb-2'> Just a button </p>
                    <button title="Button without action" type="button" className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 w-64 transition duration-200 ease-in-out">
                        Just click without action
                    </button>
                    <code className='text-xs w-48 overflow-auto mt-2 h-48'>
                        {
                            `<button title="Button without action" type="button" className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 w-64 transition duration-200 ease-in-out">
                            Just click without action
                            </button>`
                        }
                    </code>
                </div>
                <div className='flex flex-col mr-8'>
                    <p className='mb-2'> Button to update the state of input </p>
                    <div className='flex justify-left'>
                        <input
                            value={count}
                            disabled
                            className="mr-2 border border-gray-300 rounded-md px-2 py-1 w-16 text-center"
                        />
                        <button
                            onClick={() => setCount(count + 1)}
                            type="button"
                            title="Increase count"
                            className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out mr-2">
                            ▲
                        </button>
                        <button
                            onClick={() => setCount(count - 1)}
                            type="button"
                            title="Decrease count"
                            className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out mr-2">
                            ▼
                        </button>
                        <button
                            onClick={() => setCount(0)}
                            type="button"
                            title="Reset count"
                            className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out mr-2">
                            <RotateCcw />
                        </button>
                    </div>

                    <code className='text-xs w-48 overflow-auto mt-2 h-48'>
                        {
                            `
                            const [count, setCount] = useState(0);  

                            
                            <button
                            onClick={() => setCount(count + 1)}
                            type="button"
                            title="Increase count"
                            className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out mr-2">
                            ▲
                        </button>
                        
                        <button
                            onClick={() => setCount(count - 1)}
                            type="button"
                            title="Decrease count"
                            className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out">
                            ▼
                        </button>
                        
                        <button
                            onClick={() => setCount(0)}
                            type="button"
                            title="Reset count"
                            className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out mr-2">
                            <RotateCcw />
                        </button>


                        `
                        }
                    </code>
                </div>

                <div className='flex flex-col mr-8'>
                    <p className='mb-2'>Button to pop-up alert</p>

                    <button title="Show date" onClick={() => alert(`Hello there, today is ${date.toJSON().slice(0, 10)}`)} type="button" className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">
                        What date is today?
                    </button>

                    <code className='text-xs w-48 overflow-auto mt-2 h-48'>
                        {
                            `<button title="Show date" onClick={() => alert('Hello there, today is ${`date.toJSON().slice(0, 10)`}')} type="button" className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">
                        What date is today?
                    </button>`
                        }
                    </code>
                </div>

                <div className='flex flex-col mr-8'>
                    <p className='mb-2'>Disabled button</p>
                    <button title="Not available" type="button" className="bg-gray-200 text-gray-400 px-3 py-1 rounded-md" disabled>
                        Not available
                    </button>
                    <code className='text-xs w-48 overflow-auto mt-2 h-48'>
                        {
                            `<button title="Not available" type="button" className="bg-gray-200 text-gray-400 px-3 py-1 rounded-md" disabled>
                        Not available
                    </button>`
                        }
                    </code>
                </div>
            </div >
        ),
        'Text Input': (
            <div className='flex flex-col mr-8'>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Enter text here..." />
                <code className='text-xs overflow-auto mt-4'>
                    {`<input type="text" className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Enter text here..." />`}
                </code>
            </div>
        ),
        'Dropdown Menu': (
            <div className='flex flex-col mr-8'>
                <select className="border border-gray-300 rounded px-4 py-2 w-full">
                    <option value="" disabled selected>Select your fruit</option>
                    <option value="option1">Banana</option>
                    <option value="option2">Kiwi</option>
                    <option value="option3">Orange </option>
                </select>
                <code className='text-xs overflow-auto mt-4'>
                    {`<select className="border border-gray-300 rounded px-4 py-2 w-full">
                    <option value="" disabled selected>Select your fruit</option>
                    <option value="option1">Banana</option>
                    <option value="option2">Kiwi</option>
                    <option value="option3">Orange </option>
                </select>`}
                </code>
            </div>

        ),
        'Checkbox': (
            <div className='flex flex-col mr-8'>
                <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                    <span className="ml-2 text-gray-700">Check me!</span>
                </label>
                <code className='text-xs overflow-auto mt-4'>
                    {`<label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                    <span className="ml-2 text-gray-700">Check me!</span>
                </label>`}
                </code>
            </div>
        ),
        'Radio Buttons': (
            <div className='flex flex-col mr-8'>
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center">
                        <input type="radio" name="radioGroup" value="radio1" className="form-radio h-5 w-5 text-blue-600" />
                        <span className="ml-2 text-gray-700">Radio 1</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="radioGroup" value="radio2" className="form-radio h-5 w-5 text-blue-600" />
                        <span className="ml-2 text-gray-700">Radio 2</span>
                    </label>
                </div>
                <code className='text-xs overflow-auto mt-4'>
                    {`<div className="flex flex-col space-y-2">
                    <label className="flex items-center">
                        <input type="radio" name="radioGroup" value="radio1" className="form-radio h-5 w-5 text-blue-600" />
                        <span className="ml-2 text-gray-700">Radio 1</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="radioGroup" value="radio2" className="form-radio h-5 w-5 text-blue-600" />
                        <span className="ml-2 text-gray-700">Radio 2</span>
                    </label>
                </div>`}
                </code>
            </div>
        ),
        'Text Area': (
            <div className='flex flex-col mr-8'>
                <textarea onChange={(e) => setText(e.target.value)} className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Enter your comments here..." rows="4"></textarea>
                <code className='text-xs overflow-auto mt-4'>
                    {`<textarea className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Enter your comments here..." rows="4">${text}</textarea>`}
                </code>
            </div>
        ),
        'File Upload': (
            <div className='flex flex-col mr-8'>
                <label className="flex items-center cursor-pointer">
                    <span className="border border-gray-300 rounded px-4 py-2 text-gray-700">Upload File</span>
                    <input type="file" className="hidden" />
                </label>
                <code className='text-xs overflow-auto mt-4'>
                    {`<label className="flex items-center cursor-pointer">
                    <span className="border border-gray-300 rounded px-4 py-2 text-gray-700">Upload File</span>
                    <input type="file" className="hidden" />
                </label>`}
                </code>
            </div>
        ),
        'Range Slider': (
            <div className='flex flex-col mr-8'>
                <div className="flex items-center">
                    <input type="range" className="w-full h-2 bg-blue-200 rounded-lg" />
                </div>
                <code className='text-xs overflow-auto mt-4'>
                    {`<div className="flex items-center">
                    <input type="range" className="w-full h-2 bg-blue-200 rounded-lg" />
                </div>`}
                </code>
            </div>
        ),
    };

    return (
        <Base
            title={'Create a UI Component and Document it in a Design System'}
            date={'2024-10-21'}
            level={'easy'}
        >
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                <p className="font-bold">Here’s a brief overview of the Basic UI Components Library</p>
                <p>Discover a range of UI components you can incorporate into your projects.</p>
            </div>

            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                <p><strong>Instructions:</strong></p>

                <ul>
                    <li><strong>Choose a UI Component:</strong>
                        <p>Select one UI component to create. Examples include buttons, input fields, cards, dropdown menus, modals, or navigation tabs.</p>
                    </li>

                    <li><strong>Design the Component:</strong>
                        <p>Use the software of your choice (e.g., Figma, Sketch, Adobe XD, or even MS Paint) to create a high-fidelity design of your chosen component. Ensure that your component includes all necessary states (e.g., hover, active, disabled for a button).</p>
                    </li>

                    <li><strong>Document the Component:</strong>
                        <p>Write a description for your component as if it were part of a design system. Include the following sections in your documentation:</p>
                        <ul>
                            <li><strong>Overview:</strong> A brief description of the component and its purpose.</li>
                            <li><strong>Anatomy:</strong> Visual representation labeling different parts of the component (e.g., for a button: label, icon, container).</li>
                            <li><strong>Usage:</strong> Guidelines for when and where to use the component. Describe best practices and avoidable pitfalls.</li>
                            <li><strong>Variants:</strong> Different versions of the component (e.g., primary and secondary buttons, small, medium, large sizes). Explain when to use each variant.</li>
                            <li><strong>States:</strong> Visuals for different states such as default, hover, active, disabled, and focus. Describe how each state behaves and when it appears.</li>
                            <li><strong>Accessibility Considerations:</strong> How the component should be designed for accessibility, including keyboard navigation, focus indicators, and screen reader support.</li>
                            <li><strong>Code Snippet (Optional):</strong> If you have coding experience, provide a basic code example (e.g., HTML, CSS, JavaScript, or React) that shows how to implement the component.</li>
                        </ul>
                    </li>

                    <li><strong>Submit Your Work:</strong>
                        <p>Export the design as a PDF or image file.<br /> Provide a written document or slide deck with the component description and guidelines.<br /> If you include a code snippet, include it in a separate text file or as part of the written document.</p>
                    </li>
                </ul>

            </div>

            {Object.entries(elements).map(([name, comp]) => (
                <div key={name} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                    <p className="font-semibold text-lg text-gray-800">{name}</p>
                    <div className="mt-2">{comp}</div>
                </div>
            ))}
        </Base>
    );
};

export default WPSC1;
