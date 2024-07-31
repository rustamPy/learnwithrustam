
'use client';

import { useState, useEffect } from 'react';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/api/questions');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setLoading(false)
                setQuestions(data)
            } catch (error) {
                console.error('Error fetching questions:', error);
                // Handle the error, e.g., display an error message to the user
            }
        };

        fetchQuestions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {questions.map((question, index) => (
                <div key={index}>
                    <h3>{question.question}</h3>
                    <ul>
                        {question.options.map((option, i) => (
                            <li key={i}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Quiz;
