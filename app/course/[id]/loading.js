'use client';

import { Spinner } from "@material-tailwind/react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
    );
}

export default Loader;
