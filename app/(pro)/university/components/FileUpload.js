'use cleint';
// Uncomment 'use client' if you are using Next.js

import React, { useReducer, useRef } from 'react';
import { Upload, X, File, Image, CheckCircle, AlertCircle } from 'lucide-react';

// Initial state
const initialState = {
    files: [],
    isDragging: false,
    error: null,
    success: null,
    maxSize: 5
};

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DRAGGING':
            return { ...state, isDragging: action.payload };
        case 'ADD_FILES':
            return {
                ...state,
                files: [...state.files, ...action.payload],
                success: 'Files uploaded successfully!',
                error: null
            };
        case 'REMOVE_FILE':
            return {
                ...state,
                files: state.files.filter((_, index) => index !== action.payload),
                success: null
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload, success: null };
        case 'CLEAR_MESSAGES':
            return { ...state, error: null, success: null };
        case 'MAX_SIZE':
            return { ...state, maxSize: action.payload }
        default:
            return state;
    }
};

// File type icons mapping
const fileTypeIcons = {
    'image/': <Image className="w-6 h-6 text-blue-500" />,
    'application/pdf': <File className="w-6 h-6 text-red-500" />,
    'text/': <File className="w-6 h-6 text-gray-500" />,
    'default': <File className="w-6 h-6 text-gray-500" />
};

const FileUpload = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DRAGGING', payload: true });
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DRAGGING', payload: false });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DRAGGING', payload: false });

        const files = Array.from(e.dataTransfer.files);
        if (validateFiles(files)) {
            dispatch({ type: 'ADD_FILES', payload: files });
        }
    };

    const validateFiles = (files) => {
        const ms = state.maxSize * 1024 * 1024; // 5MB
        const invalidFiles = files.filter(file => file.size > ms);

        if (invalidFiles.length > 0) {
            dispatch({
                type: 'SET_ERROR',
                payload: `Some files exceed the ${state.maxSize} limit`
            });
            return false;
        }
        return true;
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (validateFiles(files)) {
            dispatch({ type: 'ADD_FILES', payload: files });
        }
    };

    const handleMaxSize = (e) => {
        dispatch({ type: 'MAX_SIZE', payload: e.target.value })
    }

    const getFileIcon = (fileType) => {
        const iconKey = Object.keys(fileTypeIcons).find(key => fileType.startsWith(key));
        return fileTypeIcons[iconKey] || fileTypeIcons.default;
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div>
                <p className='mb-2 dark:text-gray-300'>Max alowed size (MB)</p>

                <input
                    type="number"
                    value={state.maxSize}
                    onChange={handleMaxSize}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-xl px-4 py-2 w-full"
                    placeholder="Set max size threshold"
                />
            </div>
            <div
                className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer
          ${state.isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          transition-colors duration-200`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg mb-2">Drag and drop files here</p>
                <p className="text-sm text-gray-500">or click to select files</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                />
            </div>

            {state.error && (
                <div className="flex items-center gap-3 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">{state.error}</p>
                </div>
            )}

            {state.success && (
                <div className="flex items-center gap-3 p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50">
                    <CheckCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">{state.success}</p>
                </div>
            )}

            {state.files.length > 0 && (
                <div className="space-y-2">
                    {state.files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm"
                        >
                            <div className="flex items-center space-x-3">
                                {getFileIcon(file.type)}
                                <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'REMOVE_FILE', payload: index })}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;

export const FileUploadCode = () => `'use cleint';
// Uncomment 'use client' if you are using Next.js

import React, { useReducer, useRef } from 'react';
import { Upload, X, File, Image, CheckCircle, AlertCircle } from 'lucide-react';

// Initial state
const initialState = {
    files: [],
    isDragging: false,
    error: null,
    success: null
};

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DRAGGING':
            return { ...state, isDragging: action.payload };
        case 'ADD_FILES':
            return {
                ...state,
                files: [...state.files, ...action.payload],
                success: 'Files uploaded successfully!',
                error: null
            };
        case 'REMOVE_FILE':
            return {
                ...state,
                files: state.files.filter((_, index) => index !== action.payload),
                success: null
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload, success: null };
        case 'CLEAR_MESSAGES':
            return { ...state, error: null, success: null };
        default:
            return state;
    }
};

// File type icons mapping
const fileTypeIcons = {
    'image/': <Image className="w-6 h-6 text-blue-500" />,
    'application/pdf': <File className="w-6 h-6 text-red-500" />,
    'text/': <File className="w-6 h-6 text-gray-500" />,
    'default': <File className="w-6 h-6 text-gray-500" />
};

const FileUpload = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DRAGGING', payload: true });
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DRAGGING', payload: false });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DRAGGING', payload: false });

        const files = Array.from(e.dataTransfer.files);
        if (validateFiles(files)) {
            dispatch({ type: 'ADD_FILES', payload: files });
        }
    };

    const validateFiles = (files) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const invalidFiles = files.filter(file => file.size > maxSize);

        if (invalidFiles.length > 0) {
            dispatch({
                type: 'SET_ERROR',
                payload: 'Some files exceed the 5MB limit'
            });
            return false;
        }
        return true;
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (validateFiles(files)) {
            dispatch({ type: 'ADD_FILES', payload: files });
        }
    };

    const getFileIcon = (fileType) => {
        const iconKey = Object.keys(fileTypeIcons).find(key => fileType.startsWith(key));
        return fileTypeIcons[iconKey] || fileTypeIcons.default;
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div>
                <p className='mb-2 dark:text-gray-300'>Max alowed size (MB)</p>

                <input
                    type="number"
                    value={state.maxSize}
                    onChange={handleMaxSize}
                    className="mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-xl px-4 py-2 w-full"
                    placeholder="Set max size threshold"
                />
            </div>
            <div className={\`border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer \${ state.isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400' } transition-colors duration-200\`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg mb-2">Drag and drop files here</p>
                <p className="text-sm text-gray-500">or click to select files</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                />
            </div>

            {state.error && (
                <div className="flex items-center gap-3 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">{state.error}</p>
                </div>
            )}

            {state.success && (
                <div className="flex items-center gap-3 p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50">
                    <CheckCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">{state.success}</p>
                </div>
            )}

            {state.files.length > 0 && (
                <div className="space-y-2">
                    {state.files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm"
                        >
                            <div className="flex items-center space-x-3">
                                {getFileIcon(file.type)}
                                <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'REMOVE_FILE', payload: index })}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
`
