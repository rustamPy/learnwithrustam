'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import { Spinner, Select, Option, Tooltip } from '@material-tailwind/react';
import { SHORT_CODE, toCamelCase } from './utils';
import { GoDotFill, GoPlus, GoSkip } from "react-icons/go";
import { RiCloseCircleFill } from "react-icons/ri";
import { GrPowerReset, GrTest } from "react-icons/gr";
import { IoCodeSlash } from "react-icons/io5";
import { TbSourceCode } from "react-icons/tb";


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
    const [editorHidden, setEditorHidden] = useState(false);
    const [testsFullScreen, setTestsFullScreen] = useState(false);
    const [testsHidden, setTestsHidden] = useState(false);

    const editorPanelRef = useRef(null);
    const testsPanelRef = useRef(null);

    const togglePanel = useCallback((isEditor) => {
        if (isEditor) {
            setEditorHidden(prev => !prev);
            setTestsHidden(false);
        } else {
            setTestsHidden(prev => !prev);
            setEditorHidden(false);
        }
    }, []);

    useEffect(() => {
        const editorPanel = editorPanelRef.current;
        const testsPanel = testsPanelRef.current;

        if (!editorPanel || !testsPanel) return;

        if (editorHidden) {
            editorPanel.resize(3.5);
            testsPanel.resize(97);
        } else if (testsHidden) {
            editorPanel.resize(95);
            testsPanel.resize(5);
        } else {
            editorPanel.resize(50);
            testsPanel.resize(50);
        }
    }, [editorHidden, testsHidden]);




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
        setInputs(updatedTestCases);
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
                <Panel
                    minSize={3.5}
                    defaultSize={50}
                    ref={editorPanelRef}
                >
                    <WindowPanel
                        tabs={[{ name: 'Code', icon: <IoCodeSlash />, color: 'text-green-500' }]}
                        isFullScreen={editorFullScreen}
                        setFullScreen={setEditorFullScreen}
                        isHidden={editorHidden}
                        setHidden={() => togglePanel(true)}
                        additionalClass={"!h-[calc(100%)]"}
                        panelId="code-editor"
                    >
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg m-1 flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 h-16">
                                <div className='flex items-center'>
                                    <div className='mr-2'>
                                        <Select success={true} size="md" value={language.id.toString()} onChange={handleLanguageChange} label="Language" className='text-xs dark:text-gray-50'>
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
                <PanelResizeHandle withHandle className="h-1 center bg-none hover:bg-blue-500 dark:hover:bg-blue-800 rounded-full cursor-ns-resize" />
                <Panel
                    minSize={3.5}
                    defaultSize={50}
                    ref={testsPanelRef}
                >
                    <WindowPanel
                        tabs={[
                            { name: 'Default Test Cases', icon: <GrTest />, color: 'text-green-500' },
                            { name: 'Output', icon: isRunning ? <Spinner className='h-4 w-4 mr-2' /> : <TbSourceCode />, color: 'text-green-500' }
                        ]}
                        activeTab={isRunning || output ? 1 : 0}
                        isFullScreen={testsFullScreen}
                        setFullScreen={setTestsFullScreen}
                        isHidden={testsHidden}
                        setHidden={() => togglePanel(false)}
                        panelId="test-cases"
                    >
                        {/* Inputs */}
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-auto p-2 m-1">
                            {inputs && inputs.length > 0 ?
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {inputs.slice(0, maxShowingInputIndex + 1).map((_, index) => (
                                            <div
                                                key={`${index}-test-case-button`}
                                                className="relative"
                                                onMouseEnter={() => setHoverStates(prev => ({ ...prev, [index]: true }))}
                                                onMouseLeave={() => setHoverStates(prev => ({ ...prev, [index]: false }))}
                                            >
                                                <button
                                                    className={`text-sm px-[15px] py-[5px] rounded-xl ${currentInputIndex === index ? 'dark:bg-gray-700 dark:text-white bg-gray-300 text-gray-800' : 'dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 text-gray-800 dark:text-white'}`}
                                                    onClick={() => setCurrentInputIndex(index)}
                                                >
                                                    Case {index + 1}
                                                </button>
                                                {hoverStates[index] && (
                                                    <button
                                                        className="absolute -top-[5px] -right-[6px] text-sm rounded-full bg-white"
                                                        onClick={() => removeInput()}
                                                    >
                                                        <RiCloseCircleFill className="text-[15px] text-red-500 hover:text-red-700" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <Tooltip content={`Clone the current test Case ${currentInputIndex + 1}`} placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                            <button
                                                className="text-sm px-2 rounded-md dark:text-gray-200 dark:hover:text-gray-400 text-gray-800 hover:text-gray-700"
                                                onClick={cloneCurrentInput}
                                            >
                                                <GoPlus />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div>

                                        <p className="text-[15px] font-bold">Inputs:</p>

                                        <div className="grid grid-cols-1 gap-4">
                                            {inputs[currentInputIndex] && (
                                                <div className="w-full h-max rounded-lg px-2 py-1">
                                                    <div>
                                                        <div className="flex flex-col gap-2">
                                                            {inputs[currentInputIndex].slice(0, inputParams.length).map((val, idx) => (
                                                                <div key={`${currentInputIndex}-input-${idx}`}>
                                                                    <p className='mb-2 dark:text-gray-400 text-gray-700 text-[12px]'>{inputParams[idx]} <strong>({inputTypes[idx]}) </strong> = </p>
                                                                    <input
                                                                        key={`${currentInputIndex}-input-${idx}`}
                                                                        value={formatInputValue(val, inputTypes[idx])}
                                                                        onChange={(e) => updateInput(e, idx)}
                                                                        className="bg:gray-100 dark:bg-gray-800 rounded-md p-2 w-full text-md"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div> :
                                <CustomSkeleton option={"inputs"} />
                            }
                        </div>
                        {/* Outputs */}
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-auto p-2 m-1">
                            <>
                                {inputs && inputs.length > 0 && !output ? (
                                    <div className="flex justify-center items-center h-full">
                                        <p className="text-center">
                                            Run code to see output
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {isRunning ? (
                                                <CustomSkeleton option={'output'} />
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
                                                                    className={`text-sm px-[15px] py-[5px] rounded-xl ${currentInputIndex === index ? 'dark:bg-gray-700 dark:text-white bg-gray-300 text-gray-800' : 'dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 text-gray-800 dark:text-white'}`}
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
                                                                                <p className="text-[15px] font-bold">Inputs:</p>
                                                                    <div className="flex flex-col gap-2">
                                                                                    {inputs[currentInputIndex].slice(0, inputParams.length).map((val, idx) => (
                                                                            <>
                                                                                <div className='w-full h-max rounded-lg px-2 py-1'>
                                                                                    <p className="mb-2 dark:text-gray-400 text-gray-700 text-[12px]">{inputParams[idx]} <strong>({inputTypes[idx]}) </strong> = </p>
                                                                                    <input
                                                                                        key={`${currentInputIndex}-output-${idx}`}
                                                                                        value={val}
                                                                                        className="border border-gray-300 rounded-md px-2 py-1 mb-1"
                                                                                        disabled
                                                                                    />
                                                                                </div>
                                                                            </>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                            {printOutput[0]?.length > 0 && (
                                                                                <div className='w-full h-max rounded-lg dark:bg-gray-800 px-2 py-1'>

                                                                                    <p className="text-[15px] font-bold">Stdout:</p>
                                                                                    <pre className="whitespace-pre-wrap p-2 rounded-md overflow-auto max-h-48 text-gray-800 dark:text-gray-200">
                                                                                        {printOutput[currentInputIndex]?.map((o, i) => <p key={i}>{o}</p>)}
                                                                                    </pre>
                                                                                </div>
                                                                )}
                                                                            <div className='w-full h-max rounded-lg dark:bg-gray-800 px-2 py-1'>

                                                                                <p className="text-[15px] font-bold">Your Output:</p>
                                                                                <pre className={`whitespace-pre-wrap p-2 rounded-md overflow-auto max-h-48 ${output[currentInputIndex][4] === true ? 'text-green-500' : 'text-red-500'}`}>
                                                                                    {JSON.stringify(userOutput[currentInputIndex], null)}
                                                                    </pre>
                                                                </div>
                                                                            <div className='w-full h-max rounded-lg dark:bg-gray-800 px-2 py-1'>

                                                                                <p className="text-[15px] font-bold">Expected Output:</p>
                                                                                <pre className="whitespace-pre-wrap p-2 rounded-md overflow-auto max-h-48 text-green-500">
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
                            </>
                        </div>
                    </WindowPanel>
                </Panel>
            </PanelGroup>
        </Panel>
    );
};

export default CodeEditor;