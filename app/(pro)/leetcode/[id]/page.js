'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavbarVisibility } from '@/components/pro/Header/NavbarVisibilityContext';
import { PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { fetchEachQuestionMD, fetchEachTest } from '@/app/(pro)/leetcode/utils';
import { Tooltip } from '@material-tailwind/react';
import { TiMediaPlay } from 'react-icons/ti';

import MiniNavbar from '@/components/pro/Header/MiniNavbar';

import CodeEditor from './CodeEditor';
import QuestionPanel from './QuestionPanel';
import { LoadingDisplay } from './Components';
import { languages } from './Components';

import { PiLineVertical } from 'react-icons/pi';

const CodeEditorRunner = ({ params }) => {
    const { id } = params;
    const [question, setQuestion] = useState('');
    const [language, _] = useState(languages[0]);
    const [printOutput, setPrintOutput] = useState([]);
    const [status, setStatus] = useState(null);

    const [inputs, setInputs] = useState([]);
    const [testFunction, setTestFunction] = useState(null);
    const [solution, setSolution] = useState(null);
    const [expectedOutput, setExpectedOutput] = useState([])
    const [userOutput, setUserOutput] = useState([])

    const [targetTests, setTargetTests] = useState([])


    const [defaultInputs, setDumpTestCase] = useState([]);
    const [inputParams, setTestParams] = useState([]);
    const [evaluatedTestCase, setEvaluatedTestCase] = useState(defaultInputs);

    const { setIsNavbarVisible } = useNavbarVisibility();
    const [longCode, setLongCode] = useState('');
    const [shortCode, setShortCode] = useState('');
    const [baseCode, setBaseCase] = useState('')

    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

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

    console.log(`page inputs: ${inputs}`)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedQuestion = await fetchEachQuestionMD(id);
                const fetchedTest = await fetchEachTest(id);

                const params = fetchedTest.params;
                const convertedTestCase = convertTestCase(fetchedTest.content, params);

                setSolution(fetchedTest.solution)
                setTestFunction(fetchedTest.testFunction);
                setSolution(fetchedTest.solution)
                setInputs(convertedTestCase);
                setQuestion(fetchedQuestion);
                setTestParams(params);
                setDumpTestCase(convertedTestCase.slice(0, 3));
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        setIsNavbarVisible(false);
        return () => setIsNavbarVisible(true);
    }, [setIsNavbarVisible]);


    const handlePassConditions = useCallback((outputArr) => {
        const allFalse = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === false);
        const allTrue = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === true);
        setStatus(allFalse ? 'Wrong Answers' : allTrue ? 'Right Answers' : 'Mixed Results');
    }, []);


    const runCode = useCallback(async () => {
        setIsRunning(true);
        setOutput('Running...');
        setError(null);
        setEvaluatedTestCase(defaultInputs);

        try {
            const runCode = `${shortCode}\n\n${solution}\n\n${baseCode}`
            console.log(`tFunction: ${testFunction}`)
            console.log(`sCode: ${shortCode}`)
            console.log(`solution: ${solution}`)
            console.log(`bCode: ${baseCode}`)

            console.log(`runCode: ${runCode}`)

            // Run user code with test cases
            const createResponse = await fetch('http://127.0.0.1:2358/submissions', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    'x-rapidapi-key': 'ec77f5a774msh4fc4c1c656aba38p1a4647jsna78adfa32e18',
                },
                body: JSON.stringify({
                    language_id: language.id,
                    source_code: runCode,
                    stdin: JSON.stringify(defaultInputs),
                }),
            });

            if (!createResponse.ok) {
                throw new Error(`HTTP error! status: ${createResponse.status}`);
            }

            let { token: runToken } = await createResponse.json();

            let getResponseData;

            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const getResponse = await fetch(`http://127.0.0.1:2358/submissions/${runToken}`, {
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

            console.log(`getResponseDat: ${getResponseData}`)

            if (getResponseData.stdout) {
                const jsonOutput = getResponseData.stdout
                    .replace(/None/g, 'null')
                    .replace(/True/g, 'true')
                    .replace(/False/g, 'false');

                try {
                    const parsedOutput = JSON.parse(jsonOutput);
                    console.log(`parsedOutput: ${parsedOutput}`)

                    if (parsedOutput.print_output || parsedOutput.test_results) {
                        handlePassConditions(parsedOutput.test_results);
                        setOutput(parsedOutput.test_results);
                        setPrintOutput(parsedOutput.print_output);
                        setExpectedOutput(parsedOutput.expected_outputs)
                        setUserOutput(parsedOutput.user_outputs)
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
    }, [shortCode, baseCode, language.id, defaultInputs, handlePassConditions]);

    if (!question || inputParams.length === 0 || inputs.length === 0 || defaultInputs.length === 0) {
        return <LoadingDisplay />
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden max-h-full pb-1 mt-2 px-2">
            <MiniNavbar>
                <div className="flex justify-center items-center bg-gray-100 m-auto w-max px-4 py-2 rounded-xl">
                    <div className="flex items-center">
                        <Tooltip content="Run the code" placement="bottom" className="text-[10px] font-normal bg-gray-200 text-gray-800">
                            <button
                                className="flex items-center rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-50 dark:hover:text-gray-400 dark:hover:bg-gray-700"
                                onClick={runCode}
                            >
                                <TiMediaPlay className="cursor-pointer mr-1" />
                                <span className="dark:hover:text-gray-200">Run</span>
                            </button>
                        </Tooltip>
                    </div>
                    <PiLineVertical className='text-gray-300 dark:text-gray-500' />
                    <div className="flex items-center">
                        <p className="text-gray-800 dark:text-gray-50">Time</p>
                    </div>
                </div>
            </MiniNavbar>

            <PanelGroup direction="horizontal" className="flex-1" autoSaveId="persistence">
                <QuestionPanel question={question} />

                <PanelResizeHandle className="w-1 mt-8 mb-8 center bg-gray-400 hover:bg-blue-500 rounded-full cursor-ns-resize" />

                <CodeEditor
                    question={question}
                    inputParams={inputParams}
                    defaultInputs={defaultInputs}
                    inputs={inputs}
                    setInputs={setInputs}
                    userOutput={userOutput}
                    expectedOutput={expectedOutput}
                    targetTests={targetTests}
                    shortCode={shortCode}
                    setShortCode={setShortCode}
                    isRunning={isRunning}
                    output={output}
                    error={error}
                    evaluatedTestCase={evaluatedTestCase}
                    printOutput={printOutput}
                    setPrintOutput={setPrintOutput}
                    status={status}
                    testFunction={testFunction}
                    setBaseCode={setBaseCase}
                />
            </PanelGroup>
        </div>
    );
};

export default CodeEditorRunner;