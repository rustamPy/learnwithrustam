'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import { Spinner, Select, Option, Tooltip } from '@material-tailwind/react';
import { SHORT_CODE, toCamelCase, convertTestCase } from './utils';
import { GoDotFill, GoPlus, GoSkip } from "react-icons/go";
import { RiCloseCircleFill, RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";
import { GrPowerReset, GrTest } from "react-icons/gr";
import { IoCodeSlash } from "react-icons/io5";
import { TbSourceCode } from "react-icons/tb";


import { } from "react-icons/ri";
import { WindowPanel, CustomSkeleton, languages } from './Components';
import { useTheme } from 'next-themes';

const formatInputValue = (value, type) => {
    if (Array.isArray(value)) {
        if (type.startsWith('List[List[')) {
            return `[${value.map(sublist => `[${sublist.join(',')}]`).join(',')}]`;
        } else if (type.startsWith('List[')) {
            return `[${value.join(',')}]`;
        }
    }
    return value.toString();
};

const CodeEditor = ({
    question,
    inputs,
    inputTypes,
    setInputs,
    expectedOutput,
    userOutput,
    errorOutput,
    inputParams,
    setShortCode,
    isRunning,
    output,
    error,
    evaluatedInputs,
    printOutput,
    setPrintOutput,
    status,
    maxShowingInputIndex,
    setMaxShowingInputIndex,
}) => {
    const [currentShort, setCurrentShort] = useState('');
    const [language, setLanguage] = useState(languages[0]);
    const editorRef = useRef(null);
    const [currentInputIndex, setCurrentInputIndex] = useState(0);
    const [hoverStates, setHoverStates] = useState({});
    const [savingStatus, setSavingStatus] = useState('');
    const { theme } = useTheme();


    const [editorFullScreen, setEditorFullScreen] = useState(false);
    const [testsFullScreen, setTestsFullScreen] = useState(false);


    useEffect(() => {
        const savedCode = localStorage.getItem(`code_${question?.title}`);
        if (savedCode) {
            setShortCode(savedCode);
            setCurrentShort(savedCode);
        } else {
            const functionName = toCamelCase(question?.title) || '';
            const shortCodeTemplate = SHORT_CODE[language?.monacoId](functionName, inputParams);
            if (shortCodeTemplate) {
                setShortCode(shortCodeTemplate);
                setCurrentShort(shortCodeTemplate);
            } else {
                setCurrentShort("");
                console.warn(`No template found for language: ${language?.monacoId}`);
            }
        }
    }, [question, language, inputParams]);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const handleLanguageChange = useCallback((value) => {
        const selectedLanguage = languages.find(lang => lang.id.toString() === value);
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
            if (editorRef.current) {
                const model = editorRef.current.getModel();
                if (model) {
                    monaco.editor.setModelLanguage(model, selectedLanguage.monacoId);
                }
            }
        }
    }, []);

    const updateInput = useCallback((event, idx) => {
        const updatedTestCases = JSON.parse(JSON.stringify(inputs));
        updatedTestCases[currentInputIndex][idx] = event.target.value;
        const newInputs = convertTestCase(updatedTestCases, inputParams, inputTypes) || updatedTestCases;
        setInputs(newInputs);
    }, [inputs, currentInputIndex, inputParams, inputTypes, setInputs]);

    const removeInput = useCallback(() => {
        if (currentInputIndex > 0) {
            setInputs(prevInputs => prevInputs.filter((_, index) => index !== currentInputIndex));
            setCurrentInputIndex(prevIndex => prevIndex - 1);
            setMaxShowingInputIndex(prevMax => prevMax - 1);
        }
    }, [currentInputIndex, setInputs, setMaxShowingInputIndex]);

    const cloneCurrentInput = useCallback(() => {
        if (currentInputIndex >= 0) {
            setInputs(prevInputs => {
                const newInput = JSON.parse(JSON.stringify(prevInputs[currentInputIndex]));
                const newArray = [...prevInputs];
                newArray.splice(maxShowingInputIndex + 1, 0, newInput);
                return newArray;
            });
            setCurrentInputIndex(maxShowingInputIndex + 1);
            setMaxShowingInputIndex(prevMax => prevMax + 1);
        }
    }, [currentInputIndex, maxShowingInputIndex, setInputs, setMaxShowingInputIndex]);

    const handleOnEditorChange = useCallback((value) => {
        setCurrentShort(value);
        setShortCode(value);
        setPrintOutput([]);
        setSavingStatus('Saving...');
        localStorage.setItem(`code_${question?.title}`, value);
        setSavingStatus('Saved');
    }, [question, setShortCode, setPrintOutput]);

    const handleResetShortCode = useCallback(() => {
        const functionName = toCamelCase(question?.title) || '';
        const shortCodeTemplate = SHORT_CODE[language?.monacoId](functionName, inputParams);
        setCurrentShort(shortCodeTemplate);
        setShortCode(shortCodeTemplate);
        localStorage.removeItem(`code_${question?.title}`);
    }, [question, language, inputParams, setShortCode]);


    console.log(printOutput)

    const memoizedEditor = useMemo(() => (
        <Editor
            height="100%"
            language={language.monacoId}
            value={currentShort}
            onChange={handleOnEditorChange}
            onMount={handleEditorDidMount}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            options={{
                minimap: { enabled: true },
                readOnly: false,
                lineNumbers: "on",
                renderWhitespace: "all",
                autoClosingBrackets: "always",
                formatOnPaste: true,
                formatOnType: true,
            }}
            loading={<CustomSkeleton />}
        />
    ), [language, currentShort, theme, handleOnEditorChange]);


    return (
        <Panel minSize={40} defaultSize={70}>
            <PanelGroup direction="vertical">
                <Panel minSize={30} defaultSize={50}>
                    <WindowPanel tabs={[{ name: 'Code', icon: <IoCodeSlash />, color: 'text-green-500' }]} isFullScreen={editorFullScreen} setFullScreen={setEditorFullScreen}>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg m-1 flex flex-col h-full">                            
                            <div className="flex items-center justify-between p-4 border-b h-16">
                                <div className='flex items-center'>
                                    <div className='w-54 mr-2'>
                                        <Select value={language.id.toString()} onChange={handleLanguageChange} label="Language" className='text-xs dark:text-gray-50'>
                                            {languages.map((lang) => (
                                                <Option key={lang.id} value={lang.id.toString()} className='text-xs'>{lang.name}</Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <Tooltip content={`Reset the current code`} placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                        <button
                                            className="text-sm px-4 py-2 rounded-md text-gray-800 hover:text-gray-70 dark:text-gray-50 dark:hover:text-gray-400"
                                            onClick={handleResetShortCode}
                                        >
                                            <GrPowerReset className='cursor-pointer' />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div className='flex items-center'>
                                    <span className="text-sm text-gray-500 mr-2">{savingStatus}</span>
                                </div>
                            </div>
                            <div className="flex-grow overflow-hidden rounded-b-lg">
                                {memoizedEditor}
                            </div>
                        </div>
                    </WindowPanel>
                </Panel>
                <PanelResizeHandle className="h-1 mr-8 ml-8 center bg-gray-400 hover:bg-blue-500 rounded-full cursor-ns-resize" />
                <Panel minSize={20} defaultSize={50}>
                    <WindowPanel
                        tabs={[
                            { name: 'Default Test Cases', icon: <GrTest />, color: 'text-green-500' },
                            { name: 'Output', icon: isRunning ? <Spinner className='h-4 w-4 mr-2' /> : <TbSourceCode />, color: 'text-green-500' }
                        ]}
                        activeTab={isRunning || output ? 1 : 0}
                        isFullScreen={testsFullScreen}
                        setFullScreen={setTestsFullScreen}
                    >
                        <div className="bg-gray-100 rounded-xl overflow-auto h-[calc(100%-8px)] p-2 m-1">
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {inputs && inputs.length > 0 ? (
                                        <>
                                            {inputs.slice(0, maxShowingInputIndex + 1).map((_, index) => (
                                                <div
                                                    key={`${index}-test-case-button`}
                                                    className="relative"
                                                    onMouseEnter={() => setHoverStates(prev => ({ ...prev, [index]: true }))}
                                                    onMouseLeave={() => setHoverStates(prev => ({ ...prev, [index]: false }))}
                                                >
                                                    <button
                                                        className={`text-sm px-4 py-2 rounded-md ${currentInputIndex === index ? 'bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                        onClick={() => setCurrentInputIndex(index)}
                                                    >
                                                        Case {index + 1}
                                                    </button>
                                                    {hoverStates[index] && (
                                                        <button
                                                            className="absolute -top-2 -right-2 text-sm rounded-full bg-white"
                                                            onClick={() => removeInput()}
                                                        >
                                                            <RiCloseCircleFill className="text-xl text-red-500 hover:text-red-700" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <Tooltip content={`Clone the current test Case ${currentInputIndex + 1}`} placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                                <button
                                                    className="text-sm px-4 py-2 rounded-md text-gray-800 hover:text-gray-700"
                                                    onClick={cloneCurrentInput}
                                                >
                                                    <GoPlus />
                                                </button>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <CustomSkeleton />
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {inputs[currentInputIndex] && (
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <div className="flex flex-col gap-2">
                                                    {inputs[currentInputIndex].slice(0, inputParams.length).map((val, idx) => (
                                                        <div key={`${currentInputIndex}-input-${idx}`}>
                                                            <p>{inputParams[idx]} ({inputTypes[idx]}):</p>
                                                            <input
                                                                key={`${currentInputIndex}-input-${idx}`}
                                                                value={formatInputValue(val, inputTypes[idx])}
                                                                onChange={(e) => updateInput(e, idx)}
                                                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-xl overflow-auto h-[calc(100%-8px)] p-2 m-1">
                            <div>
                                {inputs && inputs.length > 0 && !output ? (
                                    <p>Run code to see output</p>
                                ) : (
                                    <>
                                        {isRunning ? (
                                            <CustomSkeleton />
                                        ) : (
                                            <>
                                                {error ? (
                                                    <div>
                                                        <h1 className="text-xl mb-4 text-red-500">Error</h1>
                                                        <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 text-red-500">
                                                            {error}
                                                        </pre>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <h1 className={`text-xl mb-4 ${status === 'Wrong Answers' ? 'text-red-500' : status === 'Right Answers' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                                        {errorOutput.length > 0 ? 'Error' : status}
                                                        </h1>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                                        {evaluatedInputs.map((_, index) => (
                                                                <button
                                                                    key={`output-${index}`}
                                                                                className={`text-sm px-4 py-2 rounded-md ${currentInputIndex === index ? 'bg-gray-300 text-gray-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                                                onClick={() => setCurrentInputIndex(index)}
                                                                >
                                                                    <div className="flex items-center">
                                                                                    {errorOutput.length > 0 ? <GoSkip className='mr-2' /> : <GoDotFill className={`mr-2 ${status === 'Wrong Answers' ? 'text-red-500' : status === 'Right Answers' ? 'text-green-500' : 'text-red-500'}`} />}
                                                                        <span>Case {index + 1}</span>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                                    {output && output[currentInputIndex] && (
                                                            <div className="grid grid-cols-1 gap-4">
                                                                            {errorOutput.length > 0 && (
                                                                                <div className='bg-red-100 rounded-xl '>
                                                                                    <pre className="whitespace-pre-wrap p-2 overflow-auto max-h-48 text-red-800">
                                                                                        {errorOutput[currentInputIndex]}
                                                                                    </pre>
                                                                                </div>
                                                                            )}
                                                                <div>
                                                                    <p className="font-bold">Inputs:</p>
                                                                    <div className="flex flex-col gap-2">
                                                                                    {inputs[currentInputIndex].slice(0, inputParams.length).map((val, idx) => (

                                                                            <>
                                                                                            <p>{inputParams[idx]}</p>
                                                                                            <input
                                                                                                key={`${currentInputIndex}-output-${idx}`}
                                                                                                value={val}
                                                                                                className="border border-gray-300 rounded-md px-2 py-1"
                                                                                                disabled
                                                                                            />
                                                                            </>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                {printOutput.length > 0 && (
                                                                    <div>
                                                                        <p className="font-bold">Stdout:</p>
                                                                        <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 text-gray-800">
                                                                                        {printOutput[currentInputIndex]?.map((o, i) => <p key={i}>{o}</p>)}
                                                                        </pre>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <p className="font-bold">Your Output:</p>
                                                                                <pre className={`whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 ${output[currentInputIndex][4] === true ? 'text-green-500' : 'text-red-500'}`}>
                                                                                    {JSON.stringify(userOutput[currentInputIndex], null)}
                                                                    </pre>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold">Expected Output:</p>
                                                                    <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 text-green-500">
                                                                                    {JSON.stringify(expectedOutput[currentInputIndex])}
                                                                    </pre>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </WindowPanel>
                </Panel>
            </PanelGroup>
        </Panel>
    );
};

export default CodeEditor;