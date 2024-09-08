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
import { LoadingDisplay, languages } from './Components';

import { PiLineVertical } from 'react-icons/pi';

import { convertTestCase, BASE_CODE, SPECIFIC_BASE_CODE, toCamelCase } from './utils'


const CodeEditorRunner = ({ params }) => {
    const { id } = params;
    const [question, setQuestion] = useState('');
    const [language, _] = useState(languages[0]);
    const [printOutput, setPrintOutput] = useState([]);
    const [status, setStatus] = useState(null);

    const [inputs, setInputs] = useState([]);
    const [inputTypes, setInputTypes] = useState([])
    const [testFunction, setTestFunction] = useState(null);
    const [solution, setSolution] = useState(null);
    const [expectedOutput, setExpectedOutput] = useState([])
    const [userOutput, setUserOutput] = useState([])
    const [errorOutput, setErrorOutput] = useState([])

    const [inputParams, setTestParams] = useState([]);
    const [maxShowingInputIndex, setMaxShowingInputIndex] = useState(2)
    const [evaluatedInputs, setEvaluatedInputs] = useState(inputs.slice(0, maxShowingInputIndex + 1));

    const { setIsNavbarVisible } = useNavbarVisibility();
    const [shortCode, setShortCode] = useState('');
    const [baseCode, setBaseCode] = useState('')

    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    const [isRunning, setIsRunning] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedQuestion = await fetchEachQuestionMD(id);
                const fetchedTest = await fetchEachTest(id);


                console.log('FETCHED CONTENT - TEST')
                console.log(fetchedTest.content)
                const params = fetchedTest.params;
                const types = fetchedTest.types || [];
                const convertedInputs = convertTestCase(fetchedTest.content, params, types);

                setSolution(fetchedTest.solution);
                setTestFunction(fetchedTest.testFunction);
                setInputTypes(types);
                setInputs(convertedInputs);
                setQuestion(fetchedQuestion);
                setTestParams(params);
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



    const handleSetLangSample = useCallback((newInputs) => {
        try {
            const functionName = toCamelCase(question?.title) || '';
            const functionParams = inputParams || [];

            const baseCodeTemplate = !testFunction ?
                BASE_CODE[language?.monacoId](JSON.stringify(functionParams), JSON.stringify(newInputs), functionName) :
                SPECIFIC_BASE_CODE[language?.monacoId] && SPECIFIC_BASE_CODE[language?.monacoId][testFunction] && SPECIFIC_BASE_CODE[language?.monacoId][testFunction](JSON.stringify(newInputs), functionName, JSON.stringify(functionParams))
            setBaseCode(baseCodeTemplate)
            return baseCodeTemplate
        } catch (error) {
            console.error("Error loading data: ", error);
            setCurrentShort("Error");
        }
    }, [language, question, inputs, inputParams, toCamelCase]);

    const runCode = useCallback(async () => {
        setIsRunning(true);
        setOutput('Running...');
        setError(null);
        setEvaluatedInputs(inputs.slice(0, maxShowingInputIndex + 1));

        try {
            const newInputs = convertTestCase(inputs, inputParams, inputTypes)
            const bCode = baseCode || handleSetLangSample(newInputs);
            const runCode = `${shortCode}\n\n${solution}\n\n${bCode}`;
            console.log(runCode)

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
                    stdin: '',
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
                        setExpectedOutput(parsedOutput.expected_outputs);
                        setUserOutput(parsedOutput.user_outputs);
                        setErrorOutput(parsedOutput.error_outputs)
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
    }, [shortCode, baseCode, language.id, handlePassConditions, inputs, inputTypes, inputParams, maxShowingInputIndex]);



    if (!question || inputParams.length === 0 || inputs.length === 0) {
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
                    inputs={inputs}
                    inputTypes={inputTypes}
                    maxShowingInputIndex={maxShowingInputIndex}
                    setMaxShowingInputIndex={setMaxShowingInputIndex}
                    setInputs={setInputs}
                    userOutput={userOutput}
                    errorOutput={errorOutput}
                    expectedOutput={expectedOutput}
                    setShortCode={setShortCode}
                    isRunning={isRunning}
                    output={output}
                    error={error}
                    evaluatedInputs={evaluatedInputs}
                    printOutput={printOutput}
                    setPrintOutput={setPrintOutput}
                    status={status}
                />
            </PanelGroup>
        </div>
    );
};

export default CodeEditorRunner;