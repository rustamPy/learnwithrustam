'use client';

import { Spinner, Typography } from "@material-tailwind/react";

const BlogLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="text-center">
                <div className="mb-6">
                    <span className="text-6xl">📝</span>
                </div>
                <Typography variant="h4" className="mb-4 text-gray-700 dark:text-gray-300">
                    Loading Blog...
                </Typography>
                <Spinner color="orange" className="h-8 w-8" />
                <Typography variant="small" className="mt-4 text-gray-500 dark:text-gray-400">
                    Preparing your reading experience
                </Typography>
            </div>
        </div>
    );
}

export default BlogLoader;