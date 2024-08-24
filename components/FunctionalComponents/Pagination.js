'use client';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-md ${currentPage === page
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}