export const WPSC = () => {
    return (
        <div className="mx-auto p-6 rounded-lg bg-white dark:bg-gray-900">
        <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Web Project Simple Components</h1>

            <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Overview</h2>
                    <p className="text-gray-800 dark:text-gray-300">
                    Simple components are the building blocks of web applications. They are reusable,
                    isolated pieces of UI that serve a single purpose and can be combined to create
                    more complex interfaces.
                </p>

                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mt-4">Key Concepts:</h3>
                    <ul className="list-disc pl-6 text-gray-800 dark:text-gray-300">
                        <li className="text-gray-800 dark:text-gray-300">Single Responsibility Principle</li>
                        <li className="text-gray-800 dark:text-gray-300">Reusability</li>
                        <li className="text-gray-800 dark:text-gray-300">Props and State Management</li>
                        <li className="text-gray-800 dark:text-gray-300">Component Lifecycle</li>
                </ul>

                <div className="bg-blue-50 px-4 py-0.5 rounded-lg mt-4">
                    <p className="text-blue-700">
                        To navigate through the lessons, use the side menu on the left. Each lesson
                        builds upon the previous one, so it's recommended to follow them in order.
                        The search bar at the top can help you quickly find specific topics.
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};
