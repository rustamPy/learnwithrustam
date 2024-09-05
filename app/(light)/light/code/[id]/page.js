'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import { Typography, Spinner, Select, Option, Button, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Tooltip, Chip } from '@material-tailwind/react';
import { fetchEachQuestionMD, fetchEachTest } from '@/app/(pro)/leetcode/utils';
import { QUESTIONS_MAP, BASES } from './utils';
import { GoDotFill, GoPlus } from "react-icons/go";
import { RiCloseCircleFill } from "react-icons/ri";
import { LuFileCode2 } from "react-icons/lu";


import useLocalStorage from './useLocalStorage';


const languages = [
    //{ id: 63, name: 'JavaScript', monacoId: 'javascript' },
    { id: 71, name: 'Python', monacoId: 'python' },
    //{ id: 62, name: 'Java', monacoId: 'java' },
    //{ id: 54, name: 'C++', monacoId: 'cpp' },
    //{ id: 51, name: 'C', monacoId: 'c' },
];

const CodeEditorRunner = ({ params }) => {
    const { id } = params;
    const [question, setQuestion] = useState(null);
    const [shortCode, setShortCode] = useLocalStorage(`short-code-${id}`, 'empty');
    const [longCode, setLongCode] = useLocalStorage(`long-code-${id}`, 'empty');
    const [language, setLanguage] = useState(languages[0]);
    const [output, setOutput] = useState(null);
    const [printOutput, setPrintOutput] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('default');
    const editorRef = useRef(null);
    const [testCase, setTestCase] = useState([]);
    const [testParams, setTestParams] = useState([]);
    const [dumpTestCase, setDumpTestCase] = useState([]);
    const [displayingTestCase, setDisplayingTestCase] = useState(0);
    const [hoverStates, setHoverStates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedQuestion = await fetchEachQuestionMD(id);
                const fetchedTest = await fetchEachTest(id);
                const params = fetchedTest.params;
                const convertedTestCase = convertTestCase(fetchedTest.content, params);
                setQuestion(fetchedQuestion);
                setTestCase(convertedTestCase);
                setTestParams(params);
                setDumpTestCase(convertedTestCase.slice(0, 3));
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        handleSetLangSample();
    }, [language, testCase]);

    const convertTestCase = (testString, params) => {
        let lines = testString.trim().split('\n').map(str => str.replace(/^<p>/, '').replace(/<\/p>$/, ''));
        const result = [];
        for (let i = 0; i < lines.length; i += params.length + 1) {
            const testCase = lines.slice(i, i + params.length + 1).map(item => {
                try {
                    return JSON.parse(item);
                } catch (e) {
                    return item;
                }
            });
            result.push(testCase);
        }
        return result;
    };

    const toCamelCase = (str) => {
        return str.split(' ').map((word, index) =>
            index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join('');
    };

    const handleSetLangSample = () => {
        try {
            const functionName = toCamelCase(question?.title) || '';
            const params = testParams || [];
            const shortCodeTemplate = QUESTIONS_MAP[language?.monacoId](functionName, params);
            const longCodeTemplate = BASES[language?.monacoId](shortCodeTemplate, JSON.stringify(params), JSON.stringify(testCase), functionName);
            if (shortCodeTemplate && longCodeTemplate) {
                setShortCode(shortCodeTemplate);
                setLongCode(longCodeTemplate);
            } else {
                setShortCode("");
                setLongCode("");
                console.warn(`No template found for language: ${language?.monacoId}`);
            }
        } catch (error) {
            console.error("Error loading data: ", error);
            setShortCode("Error");
            setLongCode("Error");
        }
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const handleLanguageChange = (value) => {
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
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput('Running...');
        setError(null);
        setActiveTab("output");

        try {
            const createResponse = await fetch('http://192.168.0.66:2358/submissions', {
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
                const getResponse = await fetch(`http://192.168.0.66:2358/submissions/${token}`, {
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
    };

    const handlePassConditions = (outputArr) => {
        const allFalse = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === false);
        const allTrue = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === true);
        setStatus(allFalse ? 'Wrong Answers' : allTrue ? 'Right Answers' : 'Mixed Results');
    };

    const handleChangeTestCases = (event, testCaseIndex, inputIndex) => {
        const updatedTestCases = JSON.parse(JSON.stringify(testCase));
        const updatedDumpTestCases = JSON.parse(JSON.stringify(dumpTestCase));

        let newValue = event.target.value.replace(/[^0-9,.-]/g, '');
        const valueArray = newValue.split(',').map(value => value.trim()).filter(Boolean).map(Number);

        updatedTestCases[testCaseIndex][inputIndex] = valueArray;
        updatedDumpTestCases[testCaseIndex][inputIndex] = newValue;

        setTestCase(updatedTestCases);
        setDumpTestCase(updatedDumpTestCases);
    };

    const removeTestCases = (testCaseIndex) => {
        if (dumpTestCase.length > 1) {
            const updatedTestCases = testCase.filter((_, index) => index !== testCaseIndex);
            const updatedDumpTestCases = dumpTestCase.filter((_, index) => index !== testCaseIndex);
            setTestCase(updatedTestCases);
            setDumpTestCase(updatedDumpTestCases);
            setDisplayingTestCase(Math.min(displayingTestCase, updatedTestCases.length - 1));
        }
    };

    const cloneTestCase = () => {
        if (testCase.length > 0) {
            const newTestCase = JSON.parse(JSON.stringify(testCase[displayingTestCase]));
            setTestCase([...testCase, newTestCase]);
            setDumpTestCase([...dumpTestCase, newTestCase]);
            setDisplayingTestCase(testCase.length);
        }
    };

    const handleOnEditorChange = (value) => {
        setShortCode(value);

        // Update longCode by replacing everything before "if __name__ == '__main__':"
        const mainIndex = longCode.indexOf("if __name__ == '__main__':");
        if (mainIndex !== -1) {
            const newLongCode = value + longCode.slice(mainIndex);
            setLongCode(newLongCode);
        } else {
            // If "if __name__ == '__main__':" is not found, just update with the new value
            setLongCode(value);
        }

        setPrintOutput([]);
    };


    console.log(question)

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center my-4">
                <Button onClick={runCode} disabled={isRunning} color="blue" className="mr-2">
                    {isRunning ? 'Running...' : 'Run Code'}
                </Button>
            </div>
            <PanelGroup direction="horizontal" className="flex-1" autoSaveId="persistence">
                <Panel minSize={20} defaultSize={30}>
                    <div className="bg-gray-100 rounded-lg m-1 h-[calc(100%-8px)] overflow-auto">
                        <div className="p-4">
                            {!question ? (
                                <div className="flex justify-center items-center h-full">
                                    <CustomSkeleton />
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <h1 className="text-2xl font-semibold text-gray-900">{question.title}</h1>
                                        <Chip
                                            value={question.level}
                                            color={question.level === 'Easy' ? 'green' : (question.level === 'Medium' ? 'gold' : 'red')}
                                            variant="outlined"
                                            className="ml-2 text-[10px]"
                                        />
                                    </div>
                                    <div className="prose max-w-full text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: question?.content }} />
                                </>
                            )}
                        </div>
                    </div>
                </Panel>

                <PanelResizeHandle className="w-1 mt-8 mb-8 center bg-gray-400 hover:bg-blue-500 rounded-full cursor-ns-resize" />
                <Panel minSize={40} defaultSize={70}>
                    <PanelGroup direction="vertical">
                        <Panel minSize={30} defaultSize={50}>
                            <div className="bg-gray-100 rounded-lg m-1 flex flex-col h-[calc(100%-8px)]">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <div className="flex items-center">
                                        <LuFileCode2 className={"mr-1"} />
                                        <span className='mr-2'>Code</span>
                                    </div>
                                    <Select value={language.id.toString()} onChange={handleLanguageChange} label="Language" className='text-xs'>
                                        {languages.map((lang) => (
                                            <Option key={lang.id} value={lang.id.toString()} className='text-xs'>{lang.name}</Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="flex-grow overflow-hidden rounded-b-lg">
                                    <Editor
                                        height="100%"
                                        language={language.monacoId}
                                        value={shortCode}
                                        onChange={handleOnEditorChange}
                                        onMount={handleEditorDidMount}
                                        theme="vs-dark"
                                        options={{ minimap: { enabled: false } }}
                                        loading={<CustomSkeleton />}
                                    />
                                </div>
                            </div>
                        </Panel>
                        <PanelResizeHandle className="h-1 mr-8 ml-8 center bg-gray-400 hover:bg-blue-500 rounded-full cursor-ns-resize" />
                        <Panel minSize={20} defaultSize={50}>
                            <div className="bg-gray-100 rounded-xl overflow-auto h-[calc(100%-8px)] p-2 m-1">
                                <Tabs value={activeTab} key={activeTab} className="p-4">
                                    <TabsHeader>
                                        <Tab className="text-sm" value="default" onClick={() => setActiveTab('default')}>Default Test Cases</Tab>
                                        <Tab className="text-sm" value="output" onClick={() => setActiveTab('output')}>
                                            <div className="flex items-center">
                                                {isRunning && <Spinner className='h-4 w-4 mr-2' />}
                                                <span>Output</span>
                                            </div>
                                        </Tab>
                                    </TabsHeader>
                                    <TabsBody>
                                        <TabPanel value="default">
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {testCase && testCase.length > 0 ? (
                                                        <>
                                                            {testCase.map((_, index) => (
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
                                                            <Tooltip content={`Clone the current test Case ${displayingTestCase + 1}`} placement="bottom" className="shadow text-[10px] font-normal bg-gray-200 text-gray-800">
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
                                                                <p className="font-bold">Inputs:</p>
                                                                <div className="flex flex-col gap-2">
                                                                    {dumpTestCase[displayingTestCase].slice(0, -1).map((inputValue, inputIndex) => (
                                                                        <input
                                                                            key={`${displayingTestCase}-input-${inputIndex}`}
                                                                            value={inputValue}
                                                                            onChange={(event) => handleChangeTestCases(event, displayingTestCase, inputIndex)}
                                                                            className="border border-gray-300 rounded-md px-2 py-1"
                                                                        />
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
                                        </TabPanel>
                                        <TabPanel value="output">
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
                                                                        {testCase.map((_, index) => (
                                                                            <button
                                                                                key={`output-${index}`}
                                                                                className={`text-sm px-4 py-2 rounded-md ${displayingTestCase === index ? 'bg-gray-300 text-gray-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                                                onClick={() => setDisplayingTestCase(index)}
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    <GoDotFill className={`mr-2 ${output && output[index][4] === true ? 'text-green-500' : 'text-red-500'}`} />
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
                                                                                                    <input
                                                                                                        key={`output-${displayingTestCase}-input-${inputIndex}`}
                                                                                                        value={inputValue}
                                                                                                        className="border border-gray-300 rounded-md px-2 py-1"
                                                                                                        disabled
                                                                                                    />
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
                                        </TabPanel>
                                    </TabsBody>
                                </Tabs>
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default CodeEditorRunner;