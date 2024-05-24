'use client';
import { Container, Form, Tab, Tabs, Card, Button } from 'react-bootstrap';
import React, { useEffect, useReducer, useState } from 'react'




const reducer = (state, action) => {
    switch (action.option) {
        case 'choose_answer':
            const isEqual = (arr1: string[], arr2: string[]) => {

                if (arr1.length !== arr2.length) {
                    return false;
                }

                const sortedArr1 = arr1.slice().sort();
                const sortedArr2 = arr2.slice().sort();

                for (let i = 0; i < sortedArr1.length; i++) {
                    if (sortedArr1[i] !== sortedArr2[i]) {
                        return false;
                    }
                }

                return true;
            };

            return state.map((question: object) => {
                if (question.id === action.id) {
                    const userAnswer: string[] = action.answers;
                    const correctAnswer: string[] = question.correctAnswer;

                    const status = isEqual(userAnswer, correctAnswer) ? 'right' : userAnswer.includes('') ? 'skipped' : 'wrong';
                    return { ...question, userAnswer, status }
                } return question;
            })
        case 'initialize':
            return action.questions

    }
}

const TryYourself = () => {

    const [downloadQuestions, setDownloadQuestions] = useState(true)
    const [state, dispatch] = useReducer(reducer, []);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch('http://localhost:3000/api/questions');
                if (!response.ok) {
                    throw new Error('Network issue');
                }

                const questions = await response.json();
                dispatch({ option: 'initialize', questions });

            } catch (error) {
                console.error(error);
            } finally {
                setDownloadQuestions(false);
            }
        }

        fetchQuestions();
    }, []);
    console.log(state)

    const q = state[index] || {}

    const handleNextQuestion = (answers: string[]) => {
        dispatch({ option: 'choose_answer', answers, id: q.id })
        setIndex(index + 1)
    }

    const isFirstLastQuestions = () => {
        return [index === 0, state.length - 1 === index]
    }

    console.log(state.length)
    console.log(index)
    console.log(state)


    return (
        <>
            {!downloadQuestions ? <Container>
                {index < state.length
                    ? <QuestionsCards
                        question={q.question}
                        answers={q.answers}
                        handleNext={handleNextQuestion}
                        type={q.type}
                        isFirstLast={isFirstLastQuestions()} />
                    : <SummaryCards questions={state} />}
            </Container> : 'Loading questions'}
        </>
    )
}


const QuestionsCards: React.FC<any> = (props) => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [answer, setAnswer] = useState('')
    const [isFirst, isLast] = props.isFirstLast;

    const handleSetAnswers = (answ: string) => {
        if (answers.includes(answ)) {
            setAnswers(answers.filter(a => a !== answ))
        } else {
            setAnswers([...answers, answ])
        }
    }

    const handleSetAnswer = (answ: string) => {
        if (answ !== answer) {
            setAnswer(answ);
        } else {
            setAnswer('');
        }
    }

    const handleClearSelections = () => {
        setAnswers([]);
        setAnswer('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.handleNext(answers.length >= 1 ? answers : [answer]);
        handleClearSelections();
    };

    return (
        <>
            <Card>
                <Card.Header className='text-red'>
                    {props.level}
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {props.question}
                    </Card.Title>
                    <Form onSubmit={handleSubmit} className='p-2 m-2'>
                        {props.answers.map((a: string, i: number) => {
                            return (
                                <Form.Check
                                    key={`${props.id}-${i + 1}`}
                                    label={a}
                                    type={props.type === 'multiple' ? 'checkbox' : 'radio'}
                                    checked={props.type === 'multiple' ? answers.includes(a) : answer === a}
                                    onClick={() => props.type === 'multiple' ? handleSetAnswers(a) : handleSetAnswer(a)} />
                            )
                        })}

                        <Button className={"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"} disabled={isFirst}> Previous Question </Button>
                        <Button variant='primary' type={'submit'}> {isLast ? 'View results' : 'Next question'}</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}


const SummaryCards: React.FC<any> = (props) => {
    const [stats, setStats] = useState({
        correct: 0,
        incorrect: 0,
        skipped: 0,
        total: 0
    });

    useEffect(() => {
        let correctCount = 0;
        let incorrectCount = 0;
        let skippedCount = 0;
        let totalCount = 0;

        props.questions.forEach((question: object) => {
            if (question.status === 'right') {
                correctCount++;
            } else if (question.status === 'wrong') {
                incorrectCount++;
            } else if (question.status === 'skipped') {
                skippedCount++;
            }
            totalCount++;

        });

        setStats({
            correct: correctCount,
            incorrect: incorrectCount,
            skipped: skippedCount,
            total: totalCount,
        });
    }, [props.questions]);

    return (
        <>
            <Tabs defaultActiveKey={'tab-1'} className='mt-9'>
                {props.questions.map((question: object, index: number) => {
                    return (
                        <Tab key={question.id} eventKey={`tab-${index + 1}`} title={`${index + 1}`}>
                            <Form>
                                <div>
                                    <h1> {question.question} </h1>
                                    {question.answers.map((a: string, i: number) => {
                                        return (
                                            <Form.Check
                                                className='mb-2'
                                                key={`${question.id}-${i}`}
                                                label={a}
                                                disabled
                                                type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                                                checked={question.userAnswer.includes(a)}
                                                style={{
                                                    backgroundColor: question.correctAnswer.includes(a) ? '#00800063'
                                                        : (question.userAnswer.includes(a) && !question.correctAnswer.includes(a)) ? '#ff000075'
                                                            : ''
                                                }} />
                                        )
                                    }
                                    )}
                                </div>
                            </Form>
                        </Tab>
                    )
                })}
            </Tabs>
            <div>
                <p>Correct: {stats.correct}/{stats.total}</p>
                <p>Incorrect: {stats.incorrect}/{stats.total}</p>
                <p>Skipped: {stats.skipped}/{stats.total}</p>
                <p>Average: {stats.correct * 100 / stats.total}%</p>

            </div>
        </>
    )
}


export default TryYourself;