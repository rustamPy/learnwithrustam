'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import { Spinner, Select, Option, Tooltip, Button } from '@material-tailwind/react';
import { QUESTIONS_MAP, BASES } from './utils';
import { GoDotFill, GoPlus } from "react-icons/go";
import { RiCloseCircleFill } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import { TiMediaPlay } from "react-icons/ti";
import { GrTest } from "react-icons/gr";
import { IoCodeSlash } from "react-icons/io5";
import { TbSourceCode } from "react-icons/tb";
import { WindowPanel, CustomSkeleton } from './Components';
import { languages } from './Components';
import { useTheme } from 'next-themes';

const CodeEditor = ({ question, tests, dumpTests, testParams }) => {
    const [shortCode, setShortCode] = useState('');
    const [currentShort, setCurrentShort] = useState('');
    const [longCode, setLongCode] = useState('');
    const [language, setLanguage] = useState(languages[0]);
    const [output, setOutput] = useState(null);
    const [printOutput, setPrintOutput] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef(null);
    const [testCase, setTestCase] = useState(tests);
    const [dumpTestCase, setDumpTestCase] = useState(dumpTests);
    const [evaluatedTestCase, setEvaluatedTestCase] = useState(dumpTestCase);
    const [displayingTestCase, setDisplayingTestCase] = useState(0);
    const [hoverStates, setHoverStates] = useState({});
    const [savingStatus, setSavingStatus] = useState('')
    const { theme } = useTheme();

    const updateLongCode = useCallback((shortCodeValue) => {
        const mainIndex = longCode.indexOf("if __name__ == '__main__':");
        if (mainIndex !== -1) {
            const newLongCode = shortCodeValue + longCode.slice(mainIndex);
            setLongCode(newLongCode);
        } else {
            setLongCode(shortCodeValue);
        }
    }, [longCode]);

    useEffect(() => {
        // Load saved code from local storage when component mounts
        const savedCode = localStorage.getItem(`code_${question?.title}`);
        if (savedCode) {
            setCurrentShort(savedCode);
            updateLongCode(savedCode);
        }
    }, [question]);

    useEffect(() => {
        handleSetLangSample();
    }, [language, testCase]);

    const toCamelCase = useCallback((str) => {
        return str?.split(' ').map((word, index) =>
            index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join('');
    }, []);

    const handleSetLangSample = useCallback(() => {
        try {
            const functionName = toCamelCase(question?.title) || '';
            const params = testParams || [];
            const shortCodeTemplate = QUESTIONS_MAP[language?.monacoId](functionName, params);
            const longCodeTemplate = BASES[language?.monacoId](shortCodeTemplate, JSON.stringify(params), JSON.stringify(testCase), functionName);
            if (shortCodeTemplate && longCodeTemplate) {
                setShortCode(shortCodeTemplate);
                // Only set currentShort if it's not already set (i.e., not loaded from local storage)
                if (!currentShort) {
                    setCurrentShort(shortCodeTemplate);
                }
                setLongCode(longCodeTemplate);
            } else {
                setCurrentShort("");
                setLongCode("");
                console.warn(`No template found for language: ${language?.monacoId}`);
            }
        } catch (error) {
            console.error("Error loading data: ", error);
            setCurrentShort("Error");
            setLongCode("Error");
        }
    }, [language, question, testCase, testParams, toCamelCase, currentShort]);

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

    const runCode = useCallback(async () => {
        setIsRunning(true);
        setOutput('Running...');
        setError(null);
        setEvaluatedTestCase(dumpTestCase);

        try {
            const createResponse = await fetch('http://127.0.0.1:2358/submissions', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    'x-rapidapi-key': 'ec77f5a774msh4fc4c1c656aba38p1a4647jsna78adfa32e18',
                },
                body: JSON.stringify({
                    language_id: language.id,
                    source_code: longCode.replace('${tests}', JSON.stringify(testCase)),
                    stdin: '',
                }),
            });

            if (!createResponse.ok) {
                throw new Error(`HTTP error! status: ${createResponse.status}`);
            }

            const { token } = await createResponse.json();

            let getResponseData;
            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const getResponse = await fetch(`http://127.0.0.1:2358/submissions/${token}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                        'x-rapidapi-key': 'ec77f5a774msh4fc4c1c656aba38p1a4647jsna78adfa32e18',
                    },
                });

                if (!getResponse.ok) {
                    throw new Error(`HTTP error! status: ${getResponse.status}`);
                }

                getResponseData = await getResponse.json();
            } while (getResponseData.status && getResponseData.status.id <= 2);

            if (getResponseData.stdout) {
                const jsonOutput = getResponseData.stdout
                    .replace(/None/g, 'null')
                    .replace(/True/g, 'true')
                    .replace(/False/g, 'false');

                try {
                    const parsedOutput = JSON.parse(jsonOutput);
                    if (parsedOutput.print_output || parsedOutput.test_results) {
                        handlePassConditions(parsedOutput.test_results);
                        setOutput(parsedOutput.test_results);
                        setPrintOutput(parsedOutput.print_output);
                    } else {
                        handlePassConditions(parsedOutput);
                        setOutput(parsedOutput);
                    }
                } catch (parseError) {
                    console.error('JSON parsing error:', parseError);
                    setError(`Error parsing output: ${jsonOutput}`);
                }
            } else if (getResponseData.stderr) {
                setError(getResponseData.stderr);
            } else if (getResponseData.compile_output) {
                setError(getResponseData.compile_output);
            } else if (getResponseData.message) {
                setError(getResponseData.message);
            } else {
                setError(JSON.stringify(getResponseData, null, 2));
            }
        } catch (error) {
            console.error('Full error:', error);
            setError('Error: ' + error.message);
        } finally {
            setIsRunning(false);
        }
    }, [language.id, longCode, testCase, dumpTestCase]);

    const handlePassConditions = useCallback((outputArr) => {
        const allFalse = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === false);
        const allTrue = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === true);
        setStatus(allFalse ? 'Wrong Answers' : allTrue ? 'Right Answers' : 'Mixed Results');
    }, []);

    const handleChangeTestCases = useCallback((event, testCaseIndex, inputIndex) => {
        const updatedTestCases = JSON.parse(JSON.stringify(testCase));
        const updatedDumpTestCases = JSON.parse(JSON.stringify(dumpTestCase));

        let newValue = event.target.value.replace(/[^0-9,.-]/g, '');
        const valueArray = newValue.split(',').map(value => value.trim()).filter(Boolean).map(Number);

        updatedTestCases[testCaseIndex][inputIndex] = valueArray;
        updatedDumpTestCases[testCaseIndex][inputIndex] = newValue;

        setTestCase(updatedTestCases);
        setDumpTestCase(updatedDumpTestCases);
    }, [testCase, dumpTestCase]);

    const removeTestCases = useCallback((testCaseIndex) => {
        if (dumpTestCase.length > 1) {
            const updatedTestCases = testCase.filter((_, index) => index !== testCaseIndex);
            const updatedDumpTestCases = dumpTestCase.filter((_, index) => index !== testCaseIndex);
            setTestCase(updatedTestCases);
            setDumpTestCase(updatedDumpTestCases);
            setDisplayingTestCase(Math.min(displayingTestCase, updatedDumpTestCases.length - 1));
        }
    }, [testCase, dumpTestCase, displayingTestCase]);

    const cloneTestCase = useCallback(() => {
        if (testCase.length > 0) {
            const newTestCase = JSON.parse(JSON.stringify(testCase[displayingTestCase]));
            setTestCase(prevTestCase => [...prevTestCase, newTestCase]);
            setDumpTestCase(prevDumpTestCase => [...prevDumpTestCase, newTestCase]);
            setDisplayingTestCase(dumpTestCase.length);
        }
    }, [testCase, dumpTestCase, displayingTestCase]);

    const handleOnEditorChange = useCallback((value) => {
        setCurrentShort(value);
        updateLongCode(value);
        setPrintOutput([]);

        setSavingStatus('Saving...')
        localStorage.setItem(`code_${question?.title}`, value)
        setSavingStatus('Saved')
    }, [longCode, question]);

    const handleResetShortCode = useCallback(() => {
        setCurrentShort(shortCode);
        updateLongCode(shortCode);
        // Remove from local storage
        localStorage.removeItem(`code_${question?.title}`);
    }, [shortCode, question, updateLongCode]);


    console.log(savingStatus)


    console.log(output)

    return (
        <Panel minSize={40} defaultSize={70}>
            <PanelGroup direction="vertical">
                <Panel minSize={30} defaultSize={50}>
                    <WindowPanel tabs={[{ name: 'Code', icon: <IoCodeSlash />, color: 'text-green-500' }]}>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg m-1 flex flex-col h-full">
                            <div className="flex items-center p-4 border-b h-16">
                                <div className='w-54 mr-2'>
                                    <Select value={language.id.toString()} onChange={handleLanguageChange} label="Language" className='text-xs dark:text-gray-50'>
                                        {languages.map((lang) => (
                                            <Option key={lang.id} value={lang.id.toString()} className='text-xs'>{lang.name}</Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='mr-2'>
                                    <Tooltip content={`Reset the current code`} placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                        <button
                                            className="text-sm px-4 py-2 rounded-md text-gray-800 hover:text-gray-70 dark:text-gray-50 dark:hover:text-gray-400"
                                            onClick={handleResetShortCode}
                                        >
                                            <GrPowerReset className='cursor-pointer' />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div className="ml-auto">
                                    <Tooltip content={`Run the code`} placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                        <button
                                            className="px-4 py-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-50 dark:hover:text-gray-400 dark:text-gray-50 dark:hover:bg-gray-700"
                                            onClick={runCode}
                                        >
                                            <div className='flex items-center'>
                                                <TiMediaPlay className='cursor-pointer mr-1' />
                                                <p className='dark:hover:text-gray-200'>Run</p>
                                            </div>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex-grow overflow-hidden rounded-b-lg">
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
                                        renderWhitespace: "all"
                                    }}
                                    loading={<CustomSkeleton />}

                                />
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
                    >
                        <div className="bg-gray-100 rounded-xl overflow-auto h-[calc(100%-8px)] p-2 m-1">
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {dumpTestCase && dumpTestCase.length > 0 ? (
                                        <>
                                            {dumpTestCase.map((_, index) => (
                                                <div
                                                    key={`${index}-test-case-button`}
                                                    className="relative"
                                                    onMouseEnter={() => setHoverStates(prev => ({ ...prev, [index]: true }))}
                                                    onMouseLeave={() => setHoverStates(prev => ({ ...prev, [index]: false }))}
                                                >
                                                    <button
                                                        className={`text-sm px-4 py-2 rounded-md ${displayingTestCase === index ? 'bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                        onClick={() => setDisplayingTestCase(index)}
                                                    >
                                                        Case {index + 1}
                                                    </button>
                                                    {hoverStates[index] && (
                                                        <button
                                                            className="absolute -top-2 -right-2 text-sm rounded-full bg-white"
                                                            onClick={() => removeTestCases(index)}
                                                        >
                                                            <RiCloseCircleFill className="text-xl text-red-500 hover:text-red-700" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <Tooltip content={`Clone the current test Case ${displayingTestCase + 1}`} placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                                                <button
                                                    className="text-sm px-4 py-2 rounded-md text-gray-800 hover:text-gray-700"
                                                    onClick={cloneTestCase}
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
                                    {dumpTestCase[displayingTestCase] && (
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <div className="flex flex-col gap-2">
                                                    {dumpTestCase[displayingTestCase].slice(0, -1).map((inputValue, inputIndex) => (
                                                        <>
                                                            <p>{testParams[inputIndex]}:</p>
                                                            <input
                                                                key={`${displayingTestCase}-input-${inputIndex}`}
                                                                value={inputValue}
                                                                onChange={(event) => handleChangeTestCases(event, displayingTestCase, inputIndex)}
                                                                className="border border-gray-300 rounded-md px-2 py-1"
                                                            />
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                            {testCase[displayingTestCase]?.output?.length > 0 && (
                                                <div>
                                                    <p className="font-bold">Expected Output:</p>
                                                    <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48">
                                                        {JSON.stringify(testCase[displayingTestCase].output, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-xl overflow-auto h-[calc(100%-8px)] p-2 m-1">
                            <div>
                                {testCase && testCase.length > 0 && !output ? (
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
                                                            {status}
                                                        </h1>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {evaluatedTestCase.map((_, index) => (
                                                                <button
                                                                    key={`output-${index}`}
                                                                    className={`text-sm px-4 py-2 rounded-md ${displayingTestCase === index ? 'bg-gray-300 text-gray-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                                    onClick={() => setDisplayingTestCase(index)}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <GoDotFill className={`mr-2 ${output && output.length >= 4 && output[index][4] === true ? 'text-green-500' : 'text-red-500'}`} />
                                                                        <span>Case {index + 1}</span>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                        {output && output[displayingTestCase] && (
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div>
                                                                    <p className="font-bold">Inputs:</p>
                                                                    <div className="flex flex-col gap-2">
                                                                        {dumpTestCase[displayingTestCase].slice(0, -1).map((inputValue, inputIndex) => (

                                                                            <>
                                                                                <p>{testParams[inputIndex]}</p>
                                                                                <input
                                                                                    key={`output-${displayingTestCase}-input-${inputIndex}`}
                                                                                    value={inputValue}
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
                                                                            {printOutput[displayingTestCase]?.map((o, i) => <p key={i}>{o}</p>)}
                                                                        </pre>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <p className="font-bold">Your Output:</p>
                                                                    <pre className={`whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 ${output[displayingTestCase][4] === true ? 'text-green-500' : 'text-red-500'}`}>
                                                                        {JSON.stringify(output[displayingTestCase][3], null, 2)}
                                                                    </pre>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold">Expected Output:</p>
                                                                    <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 text-green-500">
                                                                        {JSON.stringify(output[displayingTestCase][2], null, 2)}
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