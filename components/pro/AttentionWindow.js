import React from 'react';

export const AttentionWindow = ({ title, content, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-bounce-in">
                <div className="bg-lwr-orange-color-20 rounded-t-lg px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="px-6 py-4">
                    <p className="text-gray-700">{content}</p>
                </div>
                <div className="bg-gray-100 px-6 py-4 rounded-b-lg flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-lwr-orange-color-100 dark:bg-lwr-gray-color-200 text-gray-800 dark:text-white font-bold py-2 px-4 hover:bg-lwr-orange-color-20 rounded transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};