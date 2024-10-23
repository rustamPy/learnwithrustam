'use client';
// Uncomment 'use client' if you are using Next.js
// Scratch Page under App.js
import React, { useReducer } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const searchInitialState = {
    // Update the options here
    options: ['Banana', 'Kiwi', 'Orange'],
    searchQuery: '',
    isOpen: false,
    selectedOption: '',
};

const searchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'TOGGLE_DROPDOWN':
            return { ...state, isOpen: !state.isOpen };
        case 'SELECT_OPTION':
            return { ...state, selectedOption: action.payload, isOpen: false };
        default:
            return state;
    }
};

const DropdownWithSearch = () => {
    const [state, dispatch] = useReducer(searchReducer, searchInitialState);

    const filteredOptions = state.options.filter(option =>
        option.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

    return (
        <div className="relative w-64">
            {/* Main button */}
            <button
                onClick={() => dispatch({ type: 'TOGGLE_DROPDOWN' })}
                className="w-full px-4 py-2.5 text-left bg-white border rounded-lg shadow-sm 
                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 
                 dark:hover:bg-gray-700 transition-colors duration-150"
            >
                <div className="flex items-center justify-between">
                    <span className="block truncate">
                        {state.selectedOption || 'Select option'}
                    </span>
                    {state.isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                </div>
            </button>

            {/* Dropdown panel */}
            {state.isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg 
                      dark:bg-gray-800 border dark:border-gray-700">
                    {/* Search input */}
                    <div className="p-2 border-b dark:border-gray-700">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                               w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search options..."
                                value={state.searchQuery}
                                onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
                                className="w-full pl-9 pr-4 py-2 text-sm border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200
                         dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Options list */}
                    <ul className="max-h-60 overflow-auto py-1">
                        {filteredOptions.length === 0 ? (
                            <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                No options found
                            </li>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => dispatch({ type: 'SELECT_OPTION', payload: option })}
                                    className={`px-4 py-2 text-sm cursor-pointer
                           hover:bg-blue-50 dark:hover:bg-gray-700
                           ${option === state.selectedOption
                                            ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-200'
                                        }`}
                                >
                                    {option}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export const DropdownWithSearchCode = () => `'use client';
// Uncomment 'use client' if you are using Next.js

import React, { useReducer } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const searchInitialState = {
    // Update the options here
    options: ['Banana', 'Kiwi', 'Orange'],
    searchQuery: '',
    isOpen: false,
    selectedOption: '',
};

const searchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'TOGGLE_DROPDOWN':
            return { ...state, isOpen: !state.isOpen };
        case 'SELECT_OPTION':
            return { ...state, selectedOption: action.payload, isOpen: false };
        default:
            return state;
    }
};

const DropdownWithSearch = () => {
    const [state, dispatch] = useReducer(searchReducer, searchInitialState);

    const filteredOptions = state.options.filter(option =>
        option.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

    return (
        <div className="relative w-64">
            {/* Main button */}
            <button
                onClick={() => dispatch({ type: 'TOGGLE_DROPDOWN' })}
                className="w-full px-4 py-2.5 text-left bg-white border rounded-lg shadow-sm 
                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 
                 dark:hover:bg-gray-700 transition-colors duration-150"
            >
                <div className="flex items-center justify-between">
                    <span className="block truncate">
                        {state.selectedOption || 'Select option'}
                    </span>
                    {state.isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                </div>
            </button>

            {/* Dropdown panel */}
            {state.isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg 
                      dark:bg-gray-800 border dark:border-gray-700">
                    {/* Search input */}
                    <div className="p-2 border-b dark:border-gray-700">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                               w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search options..."
                                value={state.searchQuery}
                                onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
                                className="w-full pl-9 pr-4 py-2 text-sm border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200
                         dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Options list */}
                    <ul className="max-h-60 overflow-auto py-1">
                        {filteredOptions.length === 0 ? (
                            <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                No options found
                            </li>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => dispatch({ type: 'SELECT_OPTION', payload: option })}
                                    className={\`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700\${option === state.selectedOption ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}\`}
                                >
                                    {option}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
export default DropdownWithSearch;
`


export default DropdownWithSearch;