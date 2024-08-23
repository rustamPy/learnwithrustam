'use client';

export default function SearchBar({ onSearch }) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search videos..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
        </div>
    );
}