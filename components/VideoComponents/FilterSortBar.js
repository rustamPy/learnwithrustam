'use client';

export default function FilterSortBar({
    onCategoryChange,
    onSortOrderChange,
    selectedCategory,
    sortOrder,
    onDateChange,
    categories
}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-700 dark:text-white">Category:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-700 dark:text-white">Sort by:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => onSortOrderChange(e.target.value)}
                    className="px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                    <option value="asc">Title (A-Z)</option>
                    <option value="desc">Title (Z-A)</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-700 dark:text-white">Date:</label>
                <input
                    type="date"
                    onChange={(e) => onDateChange(e.target.value)}
                    className="px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
        </div>
    );
}