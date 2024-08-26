'use client';

import { Spinner } from "@material-tailwind/react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Spinner color="amber" className="h-16 w-16 text-blue-500" />
        </div>
    );
}

export default Loader;
