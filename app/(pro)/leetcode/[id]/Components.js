'use client';
import React, { useState, useEffect, memo } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import { PiLineVertical } from "react-icons/pi";
import { RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";


export const languages = [
    { id: 71, name: 'Python', monacoId: 'python' },
];



export const WindowPanel = memo(({ tabs = [], children, activeTab = false, isFullScreen = false, isHidden = true, setFullScreen, setHidden }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const childrenArray = React.Children.toArray(children);
    const safeTabs = tabs.length > 0 ? tabs : [{ name: 'Default Tab' }];

    const handleActiveTab = () => {
        if (typeof activeTab === "number") {
            setSelectedTab(activeTab);
        }
    };

    useEffect(() => {
        handleActiveTab();
    }, [activeTab]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg m-1 h-full overflow-auto pb-8 ">
            <div className='flex bg-gray-200 dark:bg-gray-800 px-[8px] py-[4px] sticky top-0 z-10 items-center justify-between'>
                <div className="flex flex-row">
                    {safeTabs.map((t, index) => (
                        <div key={`${index}-tab-container`} className="flex items-center">
                            <div
                                className={`flex items-center p-1 rounded ${selectedTab === index ? 'text-gray-900' : 'text-gray-500'} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
                                onClick={() => setSelectedTab(index)}
                            >
                                {t.icon && <div className={`mr-1 ${t.color}`}>{t.icon}</div>}
                                <Typography className="font-semibold w-max rounded text-xs center dark:text-white ">{t.name}</Typography>
                            </div>
                            {index < safeTabs.length - 1 && <PiLineVertical className='text-gray-300 dark:text-gray-500' />}
                        </div>
                    ))}
                </div>

                <div>
                    <div className="flex flex-row">
                        {isFullScreen ? <RiFullscreenExitLine onClick={() => setFullScreen(false)} /> : <RiFullscreenFill onClick={() => setFullScreen(true)} />}
                    </div>
                </div>
            </div>
            {childrenArray[selectedTab] || childrenArray[0] || <div>No content available</div>}
        </div>
    );
});
WindowPanel.displayName = "WindowPanel"; // Setting display name




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
CustomSkeleton.displayName = "CustomSkeleton"; // Setting display name



export const LoadingDisplay = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Spinner color="amber" className="h-16 w-16 text-blue-500" />
    </div>
);
LoadingDisplay.displayName = "LoadingDisplay"; // Setting display name