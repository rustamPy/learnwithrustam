'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import Editor from '@monaco-editor/react';
import { Typography, Spinner, Select, Option, Button, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { fetchEachQuestionMD, fetchEachTest } from '@/app/(pro)/leetcode/utils';
import { PYTHON_BASE, QUESTIONS_MAP } from './utils';
import { AiTwotoneCloseCircle } from "react-icons/ai";
import useLocalStorage from './useLocalStorage';
import { GoDotFill } from "react-icons/go";




const languages = [
    //{ id: 63, name: 'JavaScript', monacoId: 'javascript' },
    { id: 71, name: 'Python', monacoId: 'python' },
    //{ id: 62, name: 'Java', monacoId: 'java' },
    //{ id: 54, name: 'C++', monacoId: 'cpp' },
    //{ id: 51, name: 'C', monacoId: 'c' },
];

const CodeEditorRunner = ({ params }) => {
    const { id } = params;
    const [question, setQuestion] = useState({});

    const [shortCode, setShortCode] = useLocalStorage(`short-code-${id}`, 'empty')
    const [longCode, setLongCode] = useLocalStorage(`long-code-${id}`, 'empty');
    const [language, setLanguage] = useState(languages[0]);


    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);

    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('default');
    const editorRef = useRef(null);

    const [testCase, setTestCase] = useState([]);
    const [testParams, setTestParams] = useState([]);

    const [dumpTestCase, setDumpTestCase] = useState([]);
    const [displayingTestCase, setDisplayingTestCase] = useState(0);



    const convertTestCases = (testString, params) => {
        let lines = testString.trim().split('\n');
        lines = lines.map(str => str.replace(/^<p>/, '').replace(/<\/p>$/, '')); // Remove leading <p> and trailing </p>

        const result = [];
        for (let i = 0; i < lines.length; i += params.length + 1) {
            const testCase = [];
            for (let j = 0; j < params.length; j++) {
                const item = lines[i + j];
                // Use JSON.parse but ensure non-array items (like numbers) are handled correctly
                try {
                    testCase.push(JSON.parse(item));
                } catch (e) {
                    testCase.push(item); // If it's not JSON, push as a string
                }
            }
            try {
                testCase.push(JSON.parse(lines[i + params.length])); // Same for the last element
            } catch (e) {
                testCase.push(lines[i + params.length]);
            }
            result.push(testCase);
        }
        return result;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedQuestion = await fetchEachQuestionMD(id);
                const fetchedTest = await fetchEachTest(id);

                const params = fetchedTest.params;
                const convertedTestCase = convertTestCases(fetchedTest.content, params);

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


    const toCamelCase = (str) => {
        return (str.split(' ').map((word, index) =>
            index === 0
                ? word.toLowerCase() // first word is all lowercase
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // capitalize subsequent words
        )
            .join(''));
    }


    const handleSetLangSample = () => {
        try {
            const functionName = toCamelCase(question.title) || '';
            const params = testParams || [];
            const codeTemplate = QUESTIONS_MAP[language.monacoId](functionName, params);

            if (codeTemplate) {
                setLongCode(PYTHON_BASE(codeTemplate, JSON.stringify(params), JSON.stringify(testCase), functionName)
                );
            } else {
                setLongCode("");
                console.warn(`No template found for language: ${language.monacoId}`);
            }
        } catch (error) {
            console.error("Error loading data: ", error);
            setLongCode("Error");
        }
    };

    useEffect(() => {
        handleSetLangSample();
    }, [language, testCase]);


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

    useEffect(() => {
        console.log(`Tab is updated: ${activeTab}`)
    }, [activeTab])



    const runCode = async () => {
        setIsRunning(true);
        setOutput('Running...');

        try {
            setActiveTab((prevSelectedTab) => "output")
            // Step 1: Create a submission
            const createResponse = await fetch('http://192.168.0.66:2358/submissions', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    'x-rapidapi-key': 'ec77f5a774msh4fc4c1c656aba38p1a4647jsna78adfa32e18',
                },
                body: JSON.stringify({
                    language_id: language.id,
                    source_code: longCode,
                    stdin: '',
                }),
            });

            if (!createResponse.ok) {
                throw new Error(`HTTP error! status: ${createResponse.status}`);
            }

            const { token } = await createResponse.json();

            // Step 2: Get the submission
            let getResponse;
            let getResponseData;
            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                getResponse = await fetch(`http://192.168.0.66:2358/submissions/${token}`, {
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

            console.log(getResponseData)

            // Process the response
            if (getResponseData.stdout) {
                const jsonOutput = getResponseData.stdout
                    .replace(/None/g, 'null')   // Replace None with null
                    .replace(/True/g, 'true')   // Replace True with true
                    .replace(/False/g, 'false'); // Replace False with false

                const parsedOutput = JSON.parse(jsonOutput); // Convert to JS object/array
                setOutput(parsedOutput); // Set the parsed output
            } else if (getResponseData.stderr) {
                setError(getResponseData.stderr);
            } else if (getResponseData.compile_output) {
                setOutput(getResponseData.compile_output);
            } else if (getResponseData.message) {
                setOutput(getResponseData.message);
            } else {
                setOutput(JSON.stringify(getResponseData, null, 2));
            }
        } catch (error) {
            console.error('Full error:', error);
            setOutput('Error: ' + error.message);
        } finally {
            setIsRunning(false);
        }
    };


    const handleChangeTestCases = (event, testCaseIndex, inputIndex) => {
        // Create hard copies of testCase and dumpTestCase
        const updatedTestCases = JSON.parse(JSON.stringify(testCase));
        const updatedDumpTestCases = JSON.parse(JSON.stringify(dumpTestCase));

        let newValue = event.target.value;
        newValue = newValue.replace(/[^0-9,.-]/g, '');

        const valueArray = newValue.split(',')
            .map(value => value.trim())
            .filter(value => value !== '').map(Number);

        // Update the hard copies with the new values
        updatedTestCases[testCaseIndex][inputIndex] = valueArray;
        updatedDumpTestCases[testCaseIndex][inputIndex] = newValue;

        // Update state with the hard copies
        setTestCase(updatedTestCases);
        setDumpTestCase(updatedDumpTestCases);
    };

    const removeTestCases = (testCaseIndex) => {
        // Create new copies of testCase and dumpTestCase
        const updatedTestCases = [...testCase];
        const updatedDumpTestCases = [...dumpTestCase];

        // Remove the testCase at the specified index
        updatedTestCases.splice(testCaseIndex, 1);
        updatedDumpTestCases.splice(testCaseIndex, 1);

        // Update the state with the modified arrays
        setTestCase(updatedTestCases);
        setDumpTestCase(updatedDumpTestCases);
    };


    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center my-4">
                <Button onClick={runCode} disabled={isRunning} color="blue">
                    {isRunning ? 'Running...' : 'Run Code'}
                </Button>
            </div>
            <PanelGroup direction="horizontal" className="flex-1" autoSaveId="persistence">
                <Panel minSize={20} defaultSize={30}>
                    <div className="bg-gray-100 rounded-lg m-1 flex flex-col h-[calc(100%-8px)] overflow-auto">
                        <div className="p-4">
                            <h1 className="mb-4">{question.title}</h1>
                            <div className="prose" dangerouslySetInnerHTML={{ __html: question.content }} />
                        </div>
                    </div>
                </Panel>
                <PanelResizeHandle className="w-0.5 bg-gray-500 cursor-ns-resize" />
                <Panel minSize={40} defaultSize={70}>
                    <PanelGroup direction="vertical">
                        <Panel minSize={30} defaultSize={50}>
                            <div className="bg-gray-100 rounded-lg m-1 flex flex-col h-[calc(100%-8px)]">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h3 className="">Code Editor</h3>
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
                                        value={longCode}
                                        onChange={setLongCode}
                                        onMount={handleEditorDidMount}
                                        theme="vs-dark"
                                        options={{ minimap: { enabled: false } }}
                                    />
                                </div>
                            </div>
                        </Panel>
                        <PanelResizeHandle className="h-0.5 bg-gray-500 cursor-ns-resize" />
                        <Panel minSize={20} defaultSize={50}>
                            <div className="bg-gray-100 rounded-xl overflow-hidden h-[calc(100%-8px)] p-2 m-1">
                                <Tabs value={activeTab} key={activeTab} className="p-4">
                                    <TabsHeader>
                                        <Tab className="text-sm" value="default" onClick={() => setActiveTab('default')}>Default Test Cases</Tab>
                                        <Tab className="text-sm" value="output" onClick={() => setActiveTab('output')}>
                                            <div className="flex items-center">
                                                {isRunning && <Spinner className='h-4 w-4 mr-2' />}
                                                <span>Output</span>   {/* Text next to the dot */}
                                            </div>
                                        </Tab>
                                    </TabsHeader>
                                    <TabsBody>
                                        <TabPanel value="default">
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {testCase && testCase.length > 0 ? (
                                                        testCase.map((testCase, index) => (
                                                            <div key={`${index}-test-case-button`} className="relative">
                                                                <button
                                                                    className={`text-sm px-4 py-2 rounded-md ${displayingTestCase === index ? 'bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                                                        }`}
                                                                    onClick={() => setDisplayingTestCase(index)}
                                                                >
                                                                    Case {index + 1}
                                                                </button>
                                                                <button
                                                                    className="absolute bottom-7 left-[70px] text-sm rounded-full"
                                                                    onClick={() => removeTestCases(index)}
                                                                >
                                                                    <AiTwotoneCloseCircle />
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="animate-pulse">
                                                            <Typography
                                                                as="div"
                                                                variant="h1"
                                                                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                className="mb-2 h-2 w-[800px] bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                className="mb-2 h-2 w-[800px] bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                            <Typography
                                                                as="div"
                                                                variant="paragraph"
                                                                className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                            >
                                                                &nbsp;
                                                            </Typography>
                                                        </div>
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
                                                        </div>
                                                    )}

                                                    {testCase[displayingTestCase]?.output?.length > 0 && (
                                                        <div>
                                                            <p className="font-bold">Outputs:</p>
                                                            <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48">
                                                                {testCase[displayingTestCase]?.output?.map(outputValue => (
                                                                    <span key={outputValue}>{JSON.stringify(outputValue)}</span>
                                                                ))}
                                                            </pre>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="output">
                                            {testCase && testCase.length > 0 && !output ?
                                                (
                                                    <>
                                                        <p>Run first</p>
                                                    </>)
                                                :
                                                (<>
                                                    <pre className="whitespace-pre-wrap">{output}</pre>
                                                    {isRunning ? (<div className="animate-pulse">
                                                        <Typography
                                                            as="div"
                                                            variant="h1"
                                                            className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            className="mb-2 h-2 w-[800px] bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            className="mb-2 h-2 w-[800px] bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                        <Typography
                                                            as="div"
                                                            variant="paragraph"
                                                            className="mb-2 h-2 w-[800px] rounded-full bg-gray-300"
                                                        >
                                                            &nbsp;
                                                        </Typography>
                                                    </div>) : (<div className="flex flex-col space-y-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {testCase && testCase.length > 0 && (
                                                                testCase.map((testCase, index) => (
                                                                    <button
                                                                        className={`text-sm px-4 py-2 rounded-md ${displayingTestCase === index ? 'bg-gray-300 text-gray-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                                        onClick={() => setDisplayingTestCase(index)}
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <GoDotFill className={`mr-2 ${!error && output && output[displayingTestCase][4] === true ? 'text-green-500' : 'text-red-500'}`} />
                                                                            <span>Case {index + 1}</span>   {/* Text next to the dot */}
                                                                        </div>
                                                                    </button>
                                                                ))
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
                                                                                    className="border border-gray-300 rounded-md px-2 py-1"
                                                                                    disabled
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold">Output:</p>
                                                                        <pre className={`whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 ${!error && output && output[displayingTestCase][4] === true ? 'text-green-500' : 'text-red-500'}`}>
                                                                            {JSON.stringify(!error && output && output[displayingTestCase][3])}
                                                                        </pre>
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold">Expected:</p>
                                                                        <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48 text-green-500">
                                                                            {JSON.stringify(!error && output && output[displayingTestCase][2])}
                                                                        </pre>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {output?.length > 0 && (
                                                                <div>
                                                                    <p className="font-bold">Outputs:</p>
                                                                    <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md overflow-auto max-h-48">
                                                                        {/*{output.map(outputValue => (
                                                                        <span key={outputValue}>{JSON.stringify(outputValue)}</span>
                                                                    ))}*/}
                                                                    </pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>)}
                                                </>)
                                            }
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
