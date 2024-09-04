'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ResizableBox, Resizable } from 'react-resizable';
import Editor from '@monaco-editor/react';
import { Select, Option, Button, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { fetchEachQuestionMD, fetchAdditionalTestCases } from '@/app/(pro)/leetcode/utils';
import { STANDARD, QUESTIONS_MAP } from './utils';

const languages = [
    { id: 63, name: 'JavaScript', monacoId: 'javascript' },
    { id: 71, name: 'Python', monacoId: 'python' },
    { id: 62, name: 'Java', monacoId: 'java' },
    { id: 54, name: 'C++', monacoId: 'cpp' },
    { id: 51, name: 'C', monacoId: 'c' },
];

const CodeEditorRunner = ({ params }) => {
    const { id } = params;
    const [question, setQuestion] = useState({});
    const [longCode, setLongCode] = useState('');
    const [language, setLanguage] = useState(languages[0]);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testCases, setTestCases] = useState([]);
    const [additionalTestCases, setAdditionalTestCases] = useState([]);
    const [testResults, setTestResults] = useState([]);
    const [activeTab, setActiveTab] = useState('default');
    const editorRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedQuestion = await fetchEachQuestionMD(id);
                setQuestion(fetchedQuestion);
                setTestCases(fetchedQuestion.tests || []);

                const additionalTests = await fetchAdditionalTestCases(id);
                setAdditionalTestCases(additionalTests);

                handleSetLangSample(fetchedQuestion.tests || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSetLangSample = (tests) => {
        const codeTemplate = QUESTIONS_MAP[language.monacoId];
        if (codeTemplate) {
            const TEST = JSON.stringify(tests).replace(/true/g, 'True').replace(/false/g, 'False');
            setLongCode(codeTemplate + STANDARD.replace('_TEST_', TEST));
        } else {
            setLongCode('');
            console.warn(`No template found for language: ${language.monacoId}`);
        }
    };

    useEffect(() => {
        handleSetLangSample(testCases);
    }, [language]);

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
        try {
            const createResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    'x-rapidapi-key': 'ec77f5a774msh4fc4c1c656aba38p1a4647jsna78adfa32e18'
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

            let getResponse;
            let getResponseData;
            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                getResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                        'x-rapidapi-key': 'ec77f5a774msh4fc4c1c656aba38p1a4647jsna78adfa32e18'
                    },
                });

                if (!getResponse.ok) {
                    throw new Error(`HTTP error! status: ${getResponse.status}`);
                }

                getResponseData = await getResponse.json();
            } while (getResponseData.status && getResponseData.status.id <= 2);

            if (getResponseData.stdout) {
                setOutput(getResponseData.stdout);
                const results = JSON.parse(getResponseData.stdout);
                setTestResults(results);
            } else if (getResponseData.stderr) {
                setOutput(getResponseData.stderr);
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

    const addTestCase = () => {
        const newTestCase = { input: '', output: '' };
        setAdditionalTestCases([...additionalTestCases, newTestCase]);
    };

    const updateTestCase = (index, field, value) => {
        const updatedTestCases = [...additionalTestCases];
        updatedTestCases[index][field] = value;
        setAdditionalTestCases(updatedTestCases);
    };

    return (
        <div className="flex flex-col h-screen">


            <div className="flex justify-center my-4">
                <Button onClick={runCode} disabled={isRunning} color="blue">
                    {isRunning ? 'Running...' : 'Run Code'}
                </Button>
            </div>
            <div className="flex flex-1 overflow-hidden">
                <Resizable
                    width={500}
                    height={Infinity}
                    axis="x"
                    minConstraints={[300, Infinity]}
                    maxConstraints={[800, Infinity]}
                    className="overflow-auto"
                    handle={<span style={{ position: 'absolute', backgroundColor: "red", width: 10, height: '100%', cursor: 'ew-resize', right: 0, top: 0 }}></span>}

                >
                    <div className="h-full overflow-auto bg-white rounded-lg shadow p-4">
                        <h1 className="font-bold mb-4">{question.title}</h1>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: question.content }} />
                    </div>
                </Resizable>

                <div className="flex-1 flex flex-col ml-4">
                    <Resizable
                        width={700}
                        height={300}
                        minConstraints={[900, 900]}
                        maxConstraints={[800, 900]}
                        axis="x"
                        className="overflow-auto"
                        handle={<span style={{ position: 'absolute', backgroundColor: "red", width: 10, height: 'content-ful', cursor: 'ew-resize' }}></span>}

                    >
                        <div className="bg-white rounded-lg shadow mb-4">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className="">Code Editor</h3>
                                <Select value={language.id.toString()} onChange={handleLanguageChange} label="Language" className='text-xs'>
                                    {languages.map((lang) => (
                                        <Option key={lang.id} value={lang.id.toString()} className='text-xs'>{lang.name}</Option>
                                    ))}
                                </Select>
                            </div>
                            <Editor
                                height="400px"
                                language={language.monacoId}
                                value={longCode}
                                onChange={setLongCode}
                                onMount={handleEditorDidMount}
                                theme="vs-dark"
                                options={{ minimap: { enabled: false } }}
                            />
                        </div>
                    </Resizable>

                    <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
                        <Tabs value={activeTab} className="p-4">
                            <TabsHeader>
                                <Tab className="text-sm" value="default" onClick={() => setActiveTab('default')}>Default Test Cases</Tab>
                                <Tab className="text-sm" value="additional" onClick={() => setActiveTab('additional')}>Additional Test Cases</Tab>
                                <Tab className="text-sm" value="output" onClick={() => setActiveTab('output')}>Output</Tab>
                            </TabsHeader>
                            <TabsBody>
                                <TabPanel value="default">
                                    <div className="grid grid-cols-3 gap-4">
                                        {testCases.map((testCase, index) => (
                                            <div key={index} className={`p-4 rounded ${testResults[index]?.result ? 'bg-green-100' : 'bg-red-100'}`}>
                                                <h3 className="font-semibold">Test Case {index + 1}</h3>
                                                <p><strong>Input:</strong> {JSON.stringify(testCase.input)}</p>
                                                <p><strong>Expected Output:</strong> {JSON.stringify(testCase.output)}</p>
                                                {testResults[index] && (
                                                    <p><strong>Result:</strong> {testResults[index].result ? 'Passed' : 'Failed'}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </TabPanel>
                                <TabPanel value="additional">
                                    <div className="grid grid-cols-3 gap-4">
                                        {additionalTestCases.map((testCase, index) => (
                                            <div key={index} className="p-4 rounded bg-gray-100">
                                                <h3 className="font-semibold">Additional Test Case {index + 1}</h3>
                                                <input
                                                    className="w-full mb-2 p-2 border rounded"
                                                    value={testCase.input}
                                                    onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                                                    placeholder="Input"
                                                />
                                                <input
                                                    className="w-full p-2 border rounded"
                                                    value={testCase.output}
                                                    onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                                                    placeholder="Expected Output"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Button onClick={addTestCase} color="blue" className="mt-4">Add Test Case</Button>
                                </TabPanel>
                                <TabPanel value="output">
                                    <pre className="whitespace-pre-wrap">{output}</pre>
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditorRunner;
