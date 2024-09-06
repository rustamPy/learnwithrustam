'use client';
import React, { useState, useEffect, memo } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import { PiLineVertical } from "react-icons/pi";

export const languages = [
    { id: 71, name: 'Python', monacoId: 'python' },
];


export const WindowPanel = memo(({ tabs = [], children, activeTab = false }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const childrenArray = React.Children.toArray(children);
    const safeTabs = tabs.length > 0 ? tabs : [{ name: 'Default Tab' }];

    const handleActiveTab = () => {
        if (typeof activeTab === "number") {
            setSelectedTab(activeTab);
        }
    };

    // Update tab when activeTab prop changes
    useEffect(() => {
        handleActiveTab();
    }, [activeTab]); // Adding activeTab as a dependency ensures dynamic updates

    return (
        <div className="bg-gray-50 rounded-lg m-1 h-[calc(100%-8px)] overflow-auto">
            <div className='flex bg-gray-200 p-2 sticky top-0 z-10 '>
                {safeTabs.map((t, index) => (
                    <div key={`${index}-tab-container`} className="flex items-center">
                        <div
                            className={`flex items-center rounded ${selectedTab === index ? 'text-gray-900' : 'text-gray-500'} hover:bg-gray-100 cursor-pointer`}
                            onClick={() => setSelectedTab(index)}
                        >
                            {t.icon && <div className={t.color}>{t.icon}</div>}
                            <Typography className="w-max rounded text-xs p-1 center">{t.name}</Typography>
                        </div>
                        {index < safeTabs.length - 1 && <PiLineVertical className='text-gray-300' />}
                    </div>
                ))}
            </div>
            {childrenArray[selectedTab] || childrenArray[0] || <div>No content available</div>}
        </div>
    );
});


export const CustomSkeleton = () => (
    <div className="animate-pulse">
        {[...Array(12)].map((_, index) => (
            <Typography
                key={index}
                as="div"
                variant={index === 0 ? "h1" : "paragraph"}
                className={`mb-2 h-2 w-[800px] rounded-full bg-gray-300 ${index === 0 ? 'h-3 w-56 mb-4' : ''}`}
            >
                &nbsp;
            </Typography>
        ))}
    </div>
);



export const LoadingDisplay = () =>
(
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Spinner color="amber" className="h-16 w-16 text-blue-500" />
    </div>
);