export const WPSC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Web Project Simple Components</h1>

            <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
                <p>
                    Simple components are the building blocks of web applications. They are reusable,
                    isolated pieces of UI that serve a single purpose and can be combined to create
                    more complex interfaces.
                </p>

                <h3 className="text-lg font-medium text-gray-800 mt-4">Key Concepts:</h3>
                <ul className="list-disc pl-6">
                    <li>Single Responsibility Principle</li>
                    <li>Reusability</li>
                    <li>Props and State Management</li>
                    <li>Component Lifecycle</li>
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
    );
};
