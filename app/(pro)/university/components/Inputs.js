'use client';
import React, { useReducer } from 'react';

const Inputs = () => {

    const initialState = {
        overview: true,
        instructions: true,
        text: '',
        email: '',
        password: '',
        number: '',
        date: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_TEXT':
                return { ...state, text: action.payload };
            case 'SET_EMAIL':
                return { ...state, email: action.payload };
            case 'SET_PASSWORD':
                return { ...state, password: action.payload };
            case 'SET_NUMBER':
                return { ...state, number: action.payload };
            case 'SET_DATE':
                return { ...state, date: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Text input</p>
                <input
                    type="text"
                    value={state.text}
                    onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter text here..."
                    required
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Email input</p>
                <input
                    type="email"
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter email here..."
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Password input</p>
                <input
                    type="password"
                    value={state.password}
                    onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter password here..."
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Number input</p>
                <input
                    type="number"
                    value={state.number}
                    onChange={(e) => dispatch({ type: 'SET_NUMBER', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter password here..."
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Date input</p>
                <input
                    type="date"
                    value={state.date}
                    onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Select date..."
                />
            </div>
        </>
    )
}

export const InputsCode = () => `'use client';
// Uncomment 'use client' if you are using Next.js

import React, { useReducer } from 'react';

const Inputs = () => {

    const initialState = {
        overview: true,
        instructions: true,
        text: '',
        email: '',
        password: '',
        number: '',
        date: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_TEXT':
                return { ...state, text: action.payload };
            case 'SET_EMAIL':
                return { ...state, email: action.payload };
            case 'SET_PASSWORD':
                return { ...state, password: action.payload };
            case 'SET_NUMBER':
                return { ...state, number: action.payload };
            case 'SET_DATE':
                return { ...state, date: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Text input</p>
                <input
                    type="text"
                    value={state.text}
                    onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter text here..."
                    required
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Email input</p>
                <input
                    type="email"
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter email here..."
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Password input</p>
                <input
                    type="password"
                    value={state.password}
                    onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter password here..."
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Number input</p>
                <input
                    type="number"
                    value={state.number}
                    onChange={(e) => dispatch({ type: 'SET_NUMBER', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter password here..."
                />
            </div>
            <div className='flex flex-col mr-8 mb-4'>
                <p className='mb-2 dark:text-gray-300'>Date input</p>
                <input
                    type="date"
                    value={state.date}
                    onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Select date..."
                />
            </div>
        </>
    )
}

export default Inputs;
`

export default Inputs;