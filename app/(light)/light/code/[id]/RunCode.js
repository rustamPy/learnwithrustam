'use client';
import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

import { languages } from './Components';

const RunCode = ({
    longCode,
    tests,
    setOutput,
    setError,
    isRunning,
    setIsRunning,
    setActiveTab,
    language
}) => {


    const runCode = async () => {
        setIsRunning(true);
        setOutput('Running...');
        setError(null);
        setActiveTab("output");

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

    return (
        <div className="flex justify-center my-4">
            <Button onClick={runCode} disabled={isRunning} color="blue" className="mr-2">
                {isRunning ? 'Running...' : 'Run Code'}
            </Button>
        </div>
    )

}

export default RunCode;