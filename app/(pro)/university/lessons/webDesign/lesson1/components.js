'use client';
import React, { useState, useReducer, useEffect } from 'react';

import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight as lightTheme, oneDark as darkTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { WPBase } from '@/app/(pro)/university/lessons/webDesign/components.js'
import DropDownWithOptions, { DropdownWithSearchCode } from '@/app/(pro)/university/components/DropdownWithSearch'
import Inputs, { InputsCode } from '@/app/(pro)/university/components/Inputs'
import Buttons, { ButtonsCode } from '@/app/(pro)/university/components/Buttons'
import CheckBoxes, { CheckBoxesCode } from '@/app/(pro)/university/components/CheckBoxes'
import TextAreas, { TextAreasCode } from '@/app/(pro)/university/components/TextAreas'
import FileUpload, { FileUploadCode } from '@/app/(pro)/university/components/FileUpload'




import * as Icons from 'lucide-react';


const IconComponent = ({ icon, ...props }) => {
    const LucideIcon = Icons[icon];
    if (LucideIcon) {
        return <LucideIcon {...props} />;
    }
    return <span>Icon not found</span>;
};

const CodeReview = ({ code, isMobile }) => {
    const { theme } = useTheme();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative dark:border border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg p-2 ${!isMobile ? 'w-1/2' : ''}`}>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                {copied ? <IconComponent icon={'Check'} className="h-4 w-4 dark:text-gray-300" /> : <IconComponent icon={'Copy'} className="h-4 w-4 dark:text-gray-300" />}
            </button>
            <div className="text-xs overflow-auto h-[500px]"> {/* Apply smaller text size */}
                <SyntaxHighlighter
                    language="javascript"
                    style={theme === 'dark' ? darkTheme : lightTheme}
                    className={''}
                    showLineNumbers={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

const ComponentReview = ({ children, isMobile }) => (
    // Left side
    <div className={`${!isMobile ? 'w-1/2' : ''} overflow-auto mr-2 mb-2 p-2 h-[500px]`}>
        {children}
    </div>
);


export const WPSC1 = () => {

    const [selectedFruit, setSelectedFruit] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const CLOSE_ALERT = 'CLOSE_ALERT';
    const RESET_ALERTS = 'RESET_ALERTS';

    const initialAlertState = {
        overview: true,
        instructions: true,
    };

    const alertReducer = (state, action) => {
        switch (action.type) {
            case CLOSE_ALERT:
                return {
                    ...state,
                    [action.alertType]: false
                };
            case RESET_ALERTS:
                return initialAlertState;
            default:
                return state;
        }
    };

    const [alertState, alertDispatch] = useReducer(alertReducer, initialAlertState);

    const handleClose = (alertType) => {
        alertDispatch({ type: CLOSE_ALERT, alertType });
    };

    const resetAlerts = () => {
        alertDispatch({ type: RESET_ALERTS });
    };

    const elements = {
        'Buttons': {
            component: (
                <ComponentReview isMobile={isMobile}>
                    <Buttons />
                </ComponentReview>
            ),
            code: () => ButtonsCode()
        },
        'Inputs': {
            component: (
                <ComponentReview isMobile={isMobile}>
                    <Inputs />
                </ComponentReview>
            ),
            code: () => InputsCode()
        },
        'Drop Down with Search': {
            component: (<ComponentReview isMobile={isMobile}><DropDownWithOptions /> </ComponentReview>),
            code: () => DropdownWithSearchCode()
        },
        'Checkboxes': {
            component: (
                <ComponentReview isMobile={isMobile}>
                    <CheckBoxes />
                </ComponentReview>

            ),
            code: () => CheckBoxesCode()
        },
        'Text Areas': {
            component: (
                <ComponentReview isMobile={isMobile}>
                    <TextAreas />
                </ComponentReview>
            ),
            code: () => TextAreasCode()
        },
        'File Uploader': {
            component: (
                <ComponentReview isMobile={isMobile}>
                    <FileUpload />
                </ComponentReview>
            ),
            code: () => FileUploadCode()
        },
    };

    return (
        <WPBase
            title="Create a UI Component and Document it in a Design System"
            date="2024-10-21"
            level="medium"
        >
            {(!alertState.overview || !alertState.instructions) && (
                <div className='flex justify-center'>
                    <button
                        onClick={resetAlerts}
                        className="h-8 text-center text-xs items bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Reset Alerts
                    </button>
                </div>
            )}

            {alertState.overview && <div className="relative bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 text-blue-700 dark:text-blue-200 p-4 mb-4 rounded-xl" role="alert">
                <button
                    onClick={() => handleClose('overview')}
                    className="absolute top-2 right-2 p-2"
                >
                    <IconComponent icon={'CircleX'} className="h-4 w-4 text-gray-800 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400" />

                </button>
                <p className="font-bold">Here's a brief overview of the Basic UI Components Library</p>
                <p>Discover a range of UI components you can incorporate into your projects.</p>
            </div>
            }

            {alertState.instructions && <div className="relative bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 text-blue-700 dark:text-blue-200 p-4 mb-4 rounded-xl" role="alert">
                <button
                    onClick={() => handleClose('instructions')}
                    className="absolute  top-2 right-2 p-2"
                >
                    <IconComponent icon={'CircleX'} className="h-4 w-4 text-gray-800 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400" />
                </button>
                <p><strong>Instructions:</strong></p>
                <ul className="dark:text-blue-200">
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
                    <div key={name} className="relative overflow-hidden h-[600px] p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 -mx-2 -mt-2">
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                                {name}
                            </h2>
                        </div>
                        <div className="mt-4 overflow-auto h-[calc(100%-4rem)]">
                            {isMobile ? (
                                <div className="flex flex-col">
                                    {component}
                                    <CodeReview code={code()} isMobile={isMobile} />
                                </div>
                            ) : (
                                <div className="flex">
                                    {component}
                                    <CodeReview code={code()} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </WPBase>
    );
};