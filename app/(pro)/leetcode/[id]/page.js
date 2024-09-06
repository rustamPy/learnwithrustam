'use client';
import React, { useState, useEffect, use } from 'react';
import { PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Button } from '@material-tailwind/react';
import { fetchEachQuestionMD, fetchEachTest } from '@/app/(pro)/leetcode/utils';
import CodeEditor from './CodeEditor';
import QuestionPanel from './QuestionPanel'

import { LoadingDisplay } from './Components';


const CodeEditorRunner = ({ params }) => {
    const { id } = params;
    const [question, setQuestion] = useState('');
    const [tests, setTestCase] = useState([]);
    const [dumpTestCase, setDumpTestCase] = useState([]);
    const [testParams, setTestParams] = useState([]);

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

    // Render CodeEditor only if all data is available
    if (!question || testParams.length === 0 || tests.length === 0 || dumpTestCase.length === 0) {
        return <LoadingDisplay />
    }

    return (
        <div className="flex flex-col h-screen">
            <PanelGroup direction="horizontal" className="flex-1" autoSaveId="persistence">
                <QuestionPanel question={question} />

                <PanelResizeHandle className="w-1 mt-8 mb-8 center bg-gray-400 hover:bg-blue-500 rounded-full cursor-ns-resize" />

                <CodeEditor
                    question={question}
                    testParams={testParams}
                    dumpTests={dumpTestCase}
                    tests={tests}
                />
            </PanelGroup>
        </div>
    );
};

export default CodeEditorRunner;