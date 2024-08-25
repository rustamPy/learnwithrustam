'use client';
import { PiVideoCameraSlashLight } from "react-icons/pi";
import { Typography } from "@material-tailwind/react";


export default function VideoGrid({ videos, isGridView }) {
    {
        if (videos.length == 0) {
            return (

                <div className="flex flex-col items-center justify-center">
                    <Typography className="text-2xl font-bold">No videos available</Typography>
                    <PiVideoCameraSlashLight className="text-4xl" />
                </div>)
        }
    }
    if (isGridView) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={video.url}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{video.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{video.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="space-y-6">
                {videos.map((video) => (
                    <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex">
                        <div className="w-1/2 flex items-center justify-center p-4 rounded-lg overflow-hidden">
                            <iframe
                                src={video.url}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                                style={{ maxHeight: '200px' }} // Limit iframe height
                            ></iframe>
                        </div>
                        <div className="w-1/2 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{video.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{video.category}</p>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{video.details ? video.details : 'No details'}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
