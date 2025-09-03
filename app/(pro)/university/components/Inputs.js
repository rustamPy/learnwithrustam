'use client';
import React, { useReducer } from 'react';
import { AlertCircle } from 'lucide-react';

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

    const getPasswordStrength = (password) => {
        if (!password) return { strength: '', color: '' };

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const length = password.length;

        const criteria = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars, length >= 8].filter(Boolean).length;

        if (criteria <= 2) return { strength: 'Weak', color: 'text-red-600' };
        if (criteria === 3) return { strength: 'Medium', color: 'text-yellow-600' };
        if (criteria === 4) return { strength: 'Strong', color: 'text-green-600' };
        return { strength: 'Very Strong', color: 'text-green-600' };
    };
    const passwordStrength = getPasswordStrength(state.password);

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
                <div className="flex items-center space-x-2 mb-2">
                    <p className='dark:text-gray-300'>Password input</p>
                    {state.password && (
                        <div className="flex items-center space-x-1">
                            <AlertCircle className={`w-4 h-4 ${passwordStrength.color}`} />
                            <span className={`text-sm ${passwordStrength.color} font-medium`}>
                                {passwordStrength.strength}
                            </span>
                        </div>
                    )}
                </div>
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
import { AlertCircle } from 'lucide-react';

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

    const getPasswordStrength = (password) => {
        if (!password) return { strength: '', color: '' };

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const length = password.length;

        const criteria = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars, length >= 8].filter(Boolean).length;

        if (criteria <= 2) return { strength: 'Weak', color: 'text-red-600' };
        if (criteria === 3) return { strength: 'Medium', color: 'text-yellow-600' };
        if (criteria === 4) return { strength: 'Strong', color: 'text-green-600' };
        return { strength: 'Very Strong', color: 'text-green-600' };
    };
    const passwordStrength = getPasswordStrength(state.password);

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
                <div className="flex items-center space-x-2 mb-2">
                    <p className='dark:text-gray-300'>Password input</p>
                    {state.password && (
                        <div className="flex items-center space-x-1">
                            <AlertCircle className={\`w-4 h-4 \${ passwordStrength.color }\`} />
                            <span className={\`text-sm \${ passwordStrength.color } font-medium\`}>
                                {passwordStrength.strength}
                            </span>
                        </div>
                    )}
                </div>
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