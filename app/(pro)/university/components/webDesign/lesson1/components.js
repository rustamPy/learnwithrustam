'use client';
import React, { useState, useReducer } from 'react';
import { Chip } from '@material-tailwind/react';
import { RotateCcw, Copy, Check, CircleX } from 'lucide-react';

const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gray-100 rounded-lg p-4 w-1/2 ml-4">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200"
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="text-sm overflow-auto max-h-[300px] p-2">
                <code className="language-jsx">{code}</code>
            </pre>
        </div>
    );
};

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
    const [closedWindow, setClosedWindow] = useState(true)
    const [text, setText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [textAreaContent, setTextAreaContent] = useState('');
    const [selectedFruit, setSelectedFruit] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState('');
    const date = new Date();

    const CLOSE_ALERT = 'CLOSE_ALERT';
    const RESET_ALERTS = 'RESET_ALERTS';

    const initialState = {
        overview: true,
        instructions: true
    };

    const alertReducer = (state, action) => {
        switch (action.type) {
            case CLOSE_ALERT:
                return {
                    ...state,
                    [action.alertType]: false
                };
            case RESET_ALERTS:
                return initialState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const handleClose = (alertType) => {
        dispatch({ type: CLOSE_ALERT, alertType });
    };

    const resetAlerts = () => {
        dispatch({ type: RESET_ALERTS });
    };

    const elements = {
        'Buttons': {
            component: (
                <div className='w-1/2 overflow-auto'>
                    <div className='mb-4'>
                        <p className='mb-2'>Just a button</p>
                        <button
                            title="Button without action"
                            type="button"
                            className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 w-64 transition duration-200 ease-in-out"
                        >
                            Just click without action
                        </button>
                    </div>

                    <div className='mb-4'>
                        <p className='mb-2'>Button with counter</p>
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
                                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out mr-2"
                            >
                                ▲
                            </button>
                            <button
                                onClick={() => setCount(count - 1)}
                                type="button"
                                title="Decrease count"
                                className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out mr-2"
                            >
                                ▼
                            </button>
                            <button
                                onClick={() => setCount(0)}
                                type="button"
                                title="Reset count"
                                className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        </div>
                    </div>



                    <div className='flex flex-col mr-8'>
                        <p className='mb-2'>Button to pop-up alert</p>

                        <button title="Show date" onClick={() => alert(`Hello there, today is ${date.toJSON().slice(0, 10)}`)} type="button" className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">
                            What date is today?
                        </button>
                    </div>
                </div>
            ),
            code: (props) => `
// Simple Button
<button
  title="Button without action"
  type="button"
  className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 w-64 transition duration-200 ease-in-out"
>
  Just click without action
</button>

// Counter Button
const [count, setCount] = useState(${count});

<div className='flex justify-left'>
  <input
    value={${count}}
    disabled
    className="mr-2 border border-gray-300 rounded-md px-2 py-1 w-16 text-center"
  />
  <button
    onClick={() => setCount(${count} + 1)}
    type="button"
    title="Increase count"
    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out mr-2"
  >
    ▲
  </button>
  <button
    onClick={() => setCount(${count} - 1)}
    type="button"
    title="Decrease count"
    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out mr-2"
  >
    ▼
  </button>
  <button
    onClick={() => setCount(0)}
    type="button"
    title="Reset count"
    className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
  >
    <RotateCcw />
  </button>
  // Alert Button
  <button
    title="Show date"
    onClick={() => alert('Hello there, today is ${`date.toJSON().slice(0, 10)`}')} 
    type="button" 
    className="bg-gray-500 text-gray-100 px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
    >
    What date is today?
    </button>
  </div>`
        },
        'Text Input': {
            component: (
                <div className='w-1/2 overflow-auto'>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                        placeholder="Enter text here..."
                    />
                </div>
            ),
            code: () => `const [text, setText] = useState('${text}');

<input
  type="text"
  value="${text}"
  onChange={(e) => setText(e.target.value)}
  className="border border-gray-300 rounded px-4 py-2 w-full"
  placeholder="Enter text here..."
/>`
        },
        'Dropdown Menu': {
            component: (
                <div className='w-1/2 overflow-auto'>
                    <select
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                        value={selectedFruit}
                        onChange={(e) => setSelectedFruit(e.target.value)}
                    >
                        <option value="" disabled>Select your fruit</option>
                        <option value="banana">Banana</option>
                        <option value="kiwi">Kiwi</option>
                        <option value="orange">Orange</option>
                    </select>
                </div>
            ),
            code: () => `const [selectedFruit, setSelectedFruit] = useState('${selectedFruit}');

<select
  className="border border-gray-300 rounded px-4 py-2 w-full"
  value={selectedFruit}
  onChange={(e) => setSelectedFruit(e.target.value)}
>
  <option value="" disabled>Select your fruit</option>
  <option value="banana">Banana</option>
  <option value="kiwi">Kiwi</option>
  <option value="orange">Orange</option>
</select>`
        },
        'Checkbox': {
            component: (
                <div className='w-1/2 overflow-auto'>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="ml-2 text-gray-700">
                            {isChecked ? 'Checked!' : 'Check me!'}
                        </span>
                    </label>
                </div>
            ),
            code: () => `const [isChecked, setIsChecked] = useState(${isChecked});

<label className="flex items-center">
  <input 
    type="checkbox" 
    className="form-checkbox h-5 w-5 text-blue-600"
    checked={isChecked}
    onChange={(e) => setIsChecked(e.target.checked)}
  />
  <span className="ml-2 text-gray-700">
    {isChecked ? 'Checked!' : 'Check me!'}
  </span>
</label>`
        },
        'Radio Buttons': {
            component: (
                <div className='w-1/2 overflow-auto'>
                    <div className="flex flex-col space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="radioGroup"
                                value="radio1"
                                checked={selectedRadio === 'radio1'}
                                onChange={(e) => setSelectedRadio(e.target.value)}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Radio 1</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="radioGroup"
                                value="radio2"
                                checked={selectedRadio === 'radio2'}
                                onChange={(e) => setSelectedRadio(e.target.value)}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Radio 2</span>
                        </label>
                        <p className="text-sm text-gray-600">
                            Selected: {selectedRadio || 'None'}
                        </p>
                    </div>
                </div>
            ),
            code: () => `const [selectedRadio, setSelectedRadio] = useState('${selectedRadio}');

<div className="flex flex-col space-y-2">
  <label className="flex items-center">
    <input 
      type="radio" 
      name="radioGroup" 
      value="radio1"
      checked={selectedRadio === 'radio1'}
      onChange={(e) => setSelectedRadio(e.target.value)}
      className="form-radio h-5 w-5 text-blue-600" 
    />
    <span className="ml-2 text-gray-700">Radio 1</span>
  </label>
  <label className="flex items-center">
    <input 
      type="radio" 
      name="radioGroup" 
      value="radio2"
      checked={selectedRadio === 'radio2'}
      onChange={(e) => setSelectedRadio(e.target.value)}
      className="form-radio h-5 w-5 text-blue-600" 
    />
    <span className="ml-2 text-gray-700">Radio 2</span>
  </label>
  <p className="text-sm text-gray-600">
    Selected: {selectedRadio || 'None'}
  </p>
</div>`
        },
        'Text Area': {
            component: (
                <div className='w-1/2 overflow-auto'>
                    <textarea
                        value={textAreaContent}
                        onChange={(e) => setTextAreaContent(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                        placeholder="Enter your comments here..."
                        rows="4"
                    ></textarea>
                </div>
            ),
            code: () => `const [textAreaContent, setTextAreaContent] = useState('${textAreaContent}');

<textarea
  value="${textAreaContent}"
  onChange={(e) => setTextAreaContent(e.target.value)}
  className="border border-gray-300 rounded px-4 py-2 w-full"
  placeholder="Enter your comments here..."
  rows="4"
></textarea>`
        },
        'File Upload': {
            component: (
                <div className='w-1/2 overflow-auto'>
                    <label className="flex items-center cursor-pointer">
                        <span className="border border-gray-300 rounded px-4 py-2 text-gray-700">
                            {selectedFile ? selectedFile.name : 'Upload File'}
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </label>
                </div>
            ),
            code: () => `const [selectedFile, setSelectedFile] = useState(null);

<label className="flex items-center cursor-pointer">
  <span className="border border-gray-300 rounded px-4 py-2 text-gray-700">
    {selectedFile ? selectedFile.name : 'Upload File'}
  </span>
  <input
    type="file"
    className="hidden"
    onChange={(e) => setSelectedFile(e.target.files[0])}
  />
</label>`
        }
    };

    return (
        <Base
            title="Create a UI Component and Document it in a Design System"
            date="2024-10-21"
            level="medium"
        >
            {(!state.overview || !state.instructions) && (
                <div className='flex justify-center '>

                    <button
                        onClick={resetAlerts}
                        className="h-8 text-center text-xs items bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                    >
                        Reset Alerts
                    </button>
                </div>
            )}

            {state.overview && <div className="relative bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded-xl" role="alert">
                <button
                    onClick={() => handleClose('overview')}
                    className="absolute text-gray-800 top-2 right-2 p-2 rounded-md hover:text-red-500"
                >
                    <CircleX />
                </button>
                <p className="font-bold">Here’s a brief overview of the Basic UI Components Library</p>
                <p>Discover a range of UI components you can incorporate into your projects.</p>
            </div>
            }

            {state.instructions && <div className="relative bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded-xl" role="alert">
                <button
                    onClick={() => handleClose('instructions')}
                    className="absolute text-gray-800 top-2 right-2 p-2 rounded-md hover:text-red-500"
                >
                    <CircleX />
                </button>
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
            }
            <div className="space-y-8">
                {Object.entries(elements).map(([name, { component, code }]) => (
                    <div key={name} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                        <h2 className="font-semibold text-lg text-gray-800 mb-4">{name}</h2>
                        <div className="flex">
                            {component}
                            <CodeBlock code={code()} />
                        </div>
                    </div>
                ))}
            </div>
        </Base>
    );
};