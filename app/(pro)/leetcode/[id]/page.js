'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavbarVisibility } from '@/components/pro/Header/NavbarVisibilityContext';
import { PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { fetchEachQuestionMD, fetchEachTest } from '@/app/(pro)/leetcode/utils';
import { Spinner, Select, Option, Tooltip } from '@material-tailwind/react';
import { TiMediaPlay } from 'react-icons/ti';

import CodeEditor from './CodeEditor';
import QuestionPanel from './QuestionPanel';
import { LoadingDisplay } from './Components';
import { languages } from './Components';

import { PiLineVertical } from 'react-icons/pi';

const CodeEditorRunner = ({ params }) => {
    const { id } = params;
    const [question, setQuestion] = useState('');

    const [language, setLanguage] = useState(languages[0]);
    const [printOutput, setPrintOutput] = useState([]);
    const [status, setStatus] = useState(null);



    const [tests, setTestCase] = useState([]);
    const [dumpTestCase, setDumpTestCase] = useState([]);
    const [testParams, setTestParams] = useState([]);
    const [evaluatedTestCase, setEvaluatedTestCase] = useState(dumpTestCase);

    const { setIsNavbarVisible } = useNavbarVisibility();
    const [longCode, setLongCode] = useState('');
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    console.log(longCode)
    console.log(output)

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
        setIsNavbarVisible(false);
        return () => setIsNavbarVisible(true);
    }, [setIsNavbarVisible]);

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
                    source_code: longCode.replace('${tests}', JSON.stringify(tests)),
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
                console.log(getResponseData)

            } while (getResponseData.status && getResponseData.status.id <= 2);
            if (getResponseData.stdout) {
                const jsonOutput = getResponseData.stdout
                    .replace(/None/g, 'null')
                    .replace(/True/g, 'true')
                    .replace(/False/g, 'false');

                try {
                    const parsedOutput = JSON.parse(jsonOutput);
                    console.log(parsedOutput)
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
    }, [longCode, tests, dumpTestCase]);

    const handlePassConditions = useCallback((outputArr) => {
        const allFalse = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === false);
        const allTrue = outputArr.every(subArr => Array.isArray(subArr) && subArr[subArr.length - 1] === true);
        setStatus(allFalse ? 'Wrong Answers' : allTrue ? 'Right Answers' : 'Mixed Results');
    }, []);

    if (!question || testParams.length === 0 || tests.length === 0 || dumpTestCase.length === 0) {
        return <LoadingDisplay />
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden max-h-full pb-1 mt-2">
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
            <PanelGroup direction="horizontal" className="flex-1" autoSaveId="persistence">
                <QuestionPanel question={question} />

                <PanelResizeHandle className="w-1 mt-8 mb-8 center bg-gray-400 hover:bg-blue-500 rounded-full cursor-ns-resize" />

                <CodeEditor
                    question={question}
                    testParams={testParams}
                    dumpTests={dumpTestCase}
                    tests={tests}
                    longCode={longCode}
                    setLongCode={setLongCode}
                    isRunning={isRunning}
                    output={output}
                    error={error}
                    evaluatedTestCase={evaluatedTestCase}
                    printOutput={printOutput}
                    setPrintOutput={setPrintOutput}
                    status={status}
                />
            </PanelGroup>
        </div>
    );
};

export default CodeEditorRunner;