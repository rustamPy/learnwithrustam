'use client';
import React, { useReducer } from 'react';
import { Check, Minus, Circle, X } from 'lucide-react';

// Initial state for all checkbox types
const initialState = {
    basic: false,
    colored: {
        blue: false,
        green: false,
        red: false,
        purple: false
    },
    round: false,
    card: false,
    switch: false,
    indeterminate: 'indeterminate',
    list: {
        items: [
            { id: 1, text: 'Task 1', checked: false },
            { id: 2, text: 'Task 2', checked: false },
            { id: 3, text: 'Task 3', checked: false }
        ]
    }
};

// Action types
const TOGGLE_BASIC = 'TOGGLE_BASIC';
const TOGGLE_COLORED = 'TOGGLE_COLORED';
const TOGGLE_ROUND = 'TOGGLE_ROUND';
const TOGGLE_CARD = 'TOGGLE_CARD';
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const CYCLE_INDETERMINATE = 'CYCLE_INDETERMINATE';
const TOGGLE_LIST_ITEM = 'TOGGLE_LIST_ITEM';

// Reducer function
const checkboxReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_BASIC:
            return { ...state, basic: !state.basic };

        case TOGGLE_COLORED:
            return {
                ...state,
                colored: {
                    ...state.colored,
                    [action.color]: !state.colored[action.color]
                }
            };

        case TOGGLE_ROUND:
            return { ...state, round: !state.round };

        case TOGGLE_CARD:
            return { ...state, card: !state.card };

        case TOGGLE_SWITCH:
            return { ...state, switch: !state.switch };

        case CYCLE_INDETERMINATE:
            return {
                ...state,
                indeterminate: state.indeterminate === false
                    ? true
                    : state.indeterminate === true
                        ? 'indeterminate'
                        : false
            };

        case TOGGLE_LIST_ITEM:
            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.map(item =>
                        item.id === action.id
                            ? { ...item, checked: !item.checked }
                            : item
                    )
                }
            };

        default:
            return state;
    }
};

const CheckBoxes = () => {
    const [state, dispatch] = useReducer(checkboxReducer, initialState);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
            {/* Basic Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Basic Checkbox</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={`w-6 h-6 border-2 rounded flex items-center justify-center
                      transition-colors duration-200 ease-in-out
                      ${state.basic
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-gray-300 dark:border-gray-600'}`}
                        onClick={() => dispatch({ type: TOGGLE_BASIC })}
                    >
                        {state.basic && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Basic Checkbox</span>
                </label>
            </div>

            {/* Colored Checkboxes */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Colored Checkboxes</h2>
                <div className="flex flex-wrap gap-4">
                    {Object.keys(state.colored).map((color) => (
                        <label key={color} className="flex items-center space-x-3 cursor-pointer">
                            <div
                                className={`w-6 h-6 border-2 rounded flex items-center justify-center
                          transition-colors duration-200 ease-in-out
                          ${state.colored[color]
                                        ? `bg-${color}-500 border-${color}-500`
                                        : 'border-gray-300 dark:border-gray-600'}`}
                                onClick={() => dispatch({ type: TOGGLE_COLORED, color })}
                            >
                                {state.colored[color] && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-gray-700 dark:text-gray-200 capitalize">{color}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Round Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Round Checkbox</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={`w-6 h-6 border-2 rounded-full flex items-center justify-center
                      transition-colors duration-200 ease-in-out
                      ${state.round
                                ? 'bg-purple-500 border-purple-500'
                                : 'border-gray-300 dark:border-gray-600'}`}
                        onClick={() => dispatch({ type: TOGGLE_ROUND })}
                    >
                        {state.round && <Circle className="w-3 h-3 text-white fill-current" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Round Checkbox</span>
                </label>
            </div>

            {/* Card Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Card Checkbox</h2>
                <div
                    className={`p-4 border-2 rounded-lg cursor-pointer
                    transition-colors duration-200 ease-in-out
                    ${state.card
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'}`}
                    onClick={() => dispatch({ type: TOGGLE_CARD })}
                >
                    <div className="flex items-center space-x-3">
                        <div
                            className={`w-6 h-6 border-2 rounded flex items-center justify-center
                        transition-colors duration-200 ease-in-out
                        ${state.card
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'border-gray-300 dark:border-gray-600'}`}
                        >
                            {state.card && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-gray-700 dark:text-gray-200">Card Selection</span>
                    </div>
                </div>
            </div>

            {/* Switch */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Switch</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={`w-12 h-6 rounded-full flex items-center
                      transition-colors duration-200 ease-in-out
                      ${state.switch ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        onClick={() => dispatch({ type: TOGGLE_SWITCH })}
                    >
                        <div
                            className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
                        ${state.switch ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Toggle Switch</span>
                </label>
            </div>

            {/* Indeterminate Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Indeterminate Checkbox</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={`w-6 h-6 border-2 rounded flex items-center justify-center
                      transition-colors duration-200 ease-in-out
                      ${state.indeterminate !== false
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-gray-300 dark:border-gray-600'}`}
                        onClick={() => dispatch({ type: CYCLE_INDETERMINATE })}
                    >
                        {state.indeterminate === true && <Check className="w-4 h-4 text-white" />}
                        {state.indeterminate === 'indeterminate' && <Minus className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Indeterminate Checkbox</span>
                </label>
            </div>

            {/* List with Checkboxes */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">List with Checkboxes</h2>
                <div className="space-y-2">
                    {state.list.items.map((item) => (
                        <div
                            key={item.id}
                            className={`p-3 border rounded-lg cursor-pointer
                        transition-colors duration-200 ease-in-out
                        ${item.checked
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                    : 'border-gray-200 dark:border-gray-700'}`}
                            onClick={() => dispatch({ type: TOGGLE_LIST_ITEM, id: item.id })}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-6 h-6 border-2 rounded flex items-center justify-center
                              transition-colors duration-200 ease-in-out
                              ${item.checked
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-300 dark:border-gray-600'}`}
                                    >
                                        {item.checked && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
                                </div>
                                {item.checked && (
                                    <X
                                        className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch({ type: TOGGLE_LIST_ITEM, id: item.id });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const CheckBoxesCode = () => `'use client';
// Uncomment 'use client' if you are using Next.js

import React, { useReducer } from 'react';
import { Check, Minus, Circle, X } from 'lucide-react';

// Initial state for all checkbox types
const initialState = {
    basic: false,
    colored: {
        blue: false,
        green: false,
        red: false,
        purple: false
    },
    round: false,
    card: false,
    switch: false,
    indeterminate: 'indeterminate',
    list: {
        items: [
            { id: 1, text: 'Task 1', checked: false },
            { id: 2, text: 'Task 2', checked: false },
            { id: 3, text: 'Task 3', checked: false }
        ]
    }
};

// Action types
const TOGGLE_BASIC = 'TOGGLE_BASIC';
const TOGGLE_COLORED = 'TOGGLE_COLORED';
const TOGGLE_ROUND = 'TOGGLE_ROUND';
const TOGGLE_CARD = 'TOGGLE_CARD';
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const CYCLE_INDETERMINATE = 'CYCLE_INDETERMINATE';
const TOGGLE_LIST_ITEM = 'TOGGLE_LIST_ITEM';

// Reducer function
const checkboxReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_BASIC:
            return { ...state, basic: !state.basic };

        case TOGGLE_COLORED:
            return {
                ...state,
                colored: {
                    ...state.colored,
                    [action.color]: !state.colored[action.color]
                }
            };

        case TOGGLE_ROUND:
            return { ...state, round: !state.round };

        case TOGGLE_CARD:
            return { ...state, card: !state.card };

        case TOGGLE_SWITCH:
            return { ...state, switch: !state.switch };

        case CYCLE_INDETERMINATE:
            return {
                ...state,
                indeterminate: state.indeterminate === false
                    ? true
                    : state.indeterminate === true
                        ? 'indeterminate'
                        : false
            };

        case TOGGLE_LIST_ITEM:
            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.map(item =>
                        item.id === action.id
                            ? { ...item, checked: !item.checked }
                            : item
                    )
                }
            };

        default:
            return state;
    }
};

const CheckBoxes = () => {
    const [state, dispatch] = useReducer(checkboxReducer, initialState);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
            {/* Basic Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Basic Checkbox</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={\`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors duration-200 ease-in-out \${state.basic ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'}\`}
                        onClick={() => dispatch({ type: TOGGLE_BASIC })}
                    >
                        {state.basic && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Basic Checkbox</span>
                </label>
            </div>

            {/* Colored Checkboxes */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Colored Checkboxes</h2>
                <div className="flex flex-wrap gap-4">
                    {Object.keys(state.colored).map((color) => (
                        <label key={color} className="flex items-center space-x-3 cursor-pointer">
                            <div
                                className={\`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors duration-200 ease-in-out \${state.colored[color] ? \`bg-\${color}-500 border-\${color}-500\` : 'border-gray-300 dark:border-gray-600' }\`}
                                onClick={() => dispatch({ type: TOGGLE_COLORED, color })}
                            >
                                {state.colored[color] && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-gray-700 dark:text-gray-200 capitalize">{color}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Round Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Round Checkbox</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={\`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out \${ state.round ? 'bg-purple-500 border-purple-500' : 'border-gray-300 dark:border-gray-600' }\`}
                        onClick={() => dispatch({ type: TOGGLE_ROUND })}
                    >
                        {state.round && <Circle className="w-3 h-3 text-white fill-current" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Round Checkbox</span>
                </label>
            </div>

            {/* Card Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Card Checkbox</h2>
                <div
                    className={\`p - 4 border - 2 rounded - lg cursor - pointer
transition - colors duration - 200 ease -in -out
                    \${
    state.card
    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
    : 'border-gray-200 dark:border-gray-700'
} \`}
                    onClick={() => dispatch({ type: TOGGLE_CARD })}
                >
                    <div className="flex items-center space-x-3">
                        <div
                            className={\`w - 6 h - 6 border - 2 rounded flex items - center justify - center
transition - colors duration - 200 ease -in -out
                        \${
    state.card
    ? 'bg-blue-500 border-blue-500'
    : 'border-gray-300 dark:border-gray-600'
} \`}
                        >
                            {state.card && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-gray-700 dark:text-gray-200">Card Selection</span>
                    </div>
                </div>
            </div>

            {/* Switch */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Switch</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={\`w - 12 h - 6 rounded - full flex items - center
transition - colors duration - 200 ease -in -out
                      \${ state.switch ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600' } \`}
                        onClick={() => dispatch({ type: TOGGLE_SWITCH })}
                    >
                        <div
                            className={\`w - 5 h - 5 rounded - full bg - white shadow transform transition - transform duration - 200 ease -in -out
                        \${ state.switch ? 'translate-x-6' : 'translate-x-1' }\`}
                        />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Toggle Switch</span>
                </label>
            </div>

            {/* Indeterminate Checkbox */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Indeterminate Checkbox</h2>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div
                        className={\`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors duration-200 ease-in-out \${ state.indeterminate !== false ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'} \`}
                        onClick={() => dispatch({ type: CYCLE_INDETERMINATE })}
                    >
                        {state.indeterminate === true && <Check className="w-4 h-4 text-white" />}
                        {state.indeterminate === 'indeterminate' && <Minus className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">Indeterminate Checkbox</span>
                </label>
            </div>

            {/* List with Checkboxes */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">List with Checkboxes</h2>
                <div className="space-y-2">
                    {state.list.items.map((item) => (
                        <div
                            key={item.id}
                            className={\`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ease-in-out \${ item.checked ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700' } \`}
                            onClick={() => dispatch({ type: TOGGLE_LIST_ITEM, id: item.id })}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={\`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors duration-200 ease-in-out \${ item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600' }\`}
                                    >
                                        {item.checked && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
                                </div>
                                {item.checked && (
                                    <X
                                        className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch({ type: TOGGLE_LIST_ITEM, id: item.id });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckBoxes;
`

export default CheckBoxes;