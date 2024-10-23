'use client';
import { Search } from 'lucide-react';
const SearchBar = ({ placeholder, onSearch }) => {
    return (
        <div className="mb-6 px-4 pb-2">
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
        </div>
    );
};
export default SearchBar;