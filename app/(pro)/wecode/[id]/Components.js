'use client';
import React, { useState, useEffect, memo } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import { PiLineVertical } from "react-icons/pi";
import { RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";
import { FaRegWindowMinimize } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

export const languages = [
    { id: 71, name: 'Python', monacoId: 'python' },
];


export const WindowPanel = memo(({
    tabs = [],
    children,
    activeTab = false,
    isFullScreen = false,
    isHidden = false,
    setFullScreen,
    setHidden,
    additionalClass = '',
    panelId
}) => {
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

    const toggleFullScreen = () => {
        if (isHidden) {
            setHidden(false);
        }
        setFullScreen(!isFullScreen);
    };

    const toggleHidden = () => {
        setHidden(!isHidden);
    };

    useEffect(() => {
        // Raise the panel back up when it's no longer hidden
        if (!isHidden) {
            setFullScreen(false);
        }
    }, [isHidden, setFullScreen]);

    if (isHidden) {
        return (
            <div className={`bg-gray-50 dark:bg-gray-900 rounded-xl h-8 my-[2px] mx-[1px] overflow-auto`}>

            <div className='flex bg-gray-200 dark:bg-gray-800 px-[8px] py-[4px] sticky top-0 z-10 items-center justify-between'>

                <div className="flex flex-row">
                    {safeTabs.map((t, index) => (
                        <div key={`${panelId}-${index}-tab-container`} className="flex items-center">
                            <div
                                className={`flex items-center p-1 rounded ${selectedTab === index ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-500'} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
                                onClick={() => setSelectedTab(index)}
                            >
                                {t.icon && <div className={`mr-1 ${t.color}`}>{t.icon}</div>}
                                <Typography className="font-semibold w-max rounded text-xs center dark:text-white ">{t.name}</Typography>
                            </div>
                            {index < safeTabs.length - 1 && <PiLineVertical className='text-gray-300 dark:text-gray-500' />}
                        </div>
                    ))}
                </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={toggleHidden} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <FaRegWindowMinimize size={15} />
                        </button>
                        <button onClick={toggleFullScreen} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            {isFullScreen ? <RiFullscreenExitLine size={15} /> : <RiFullscreenFill size={15} />}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-gray-50 dark:bg-gray-900 rounded-xl h-[calc(100%-15px)] my-[2px] mx-[1px] overflow-auto ${additionalClass} ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
            <div className='flex bg-gray-200 dark:bg-gray-800 px-[8px] py-[4px] sticky top-0 z-10 items-center justify-between'>
                <div className="flex flex-row">
                    {safeTabs.map((t, index) => (
                        <div key={`${panelId}-${index}-tab-container`} className="flex items-center">
                            <div
                                className={`flex items-center p-1 rounded ${selectedTab === index ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-500'} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
                                onClick={() => setSelectedTab(index)}
                            >
                                {t.icon && <div className={`mr-1 ${t.color}`}>{t.icon}</div>}
                                <Typography className="font-semibold w-max rounded text-xs center">{t.name}</Typography>
                            </div>
                            {index < safeTabs.length - 1 && <PiLineVertical className='text-gray-300 dark:text-gray-500' />}
                        </div>
                    ))}
                </div>

                <div className="flex items-center space-x-2">
                    <button onClick={toggleHidden} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <FaRegWindowMinimize size={15} />
                    </button>
                    <button onClick={toggleFullScreen} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        {isFullScreen ? <RiFullscreenExitLine size={15} /> : <RiFullscreenFill size={15} />}
                    </button>
                </div>
            </div>
            {childrenArray[selectedTab] || childrenArray[0] || <div>No content available</div>}
        </div>
    );
});

WindowPanel.displayName = "WindowPanel";


export const CustomSkeleton = ({ option }) => (
    <div className="animate-pulse">
        {option === 'output' ?
            <>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-full bg-gray-300 h-[30px] w-[200px] mb-4`}
                >
                    &nbsp;
                </Typography>

                <div className="flex flex-row">

                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-full bg-gray-300 h-[30px] w-[100px] mb-4 mr-4`}
                    >
                        &nbsp;
                    </Typography>

                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-full bg-gray-300 h-[30px] w-[100px] mb-4`}
                    >
                        &nbsp;
                    </Typography>
                </div>

                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-full bg-gray-300 h-[12px] w-[120px] mb-2`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-full bg-gray-300 h-[10px] w-[100px] mb-2`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-md bg-gray-300 h-[30px] w-full mb-4`}
                >
                    &nbsp;
                </Typography>

                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-full bg-gray-300 h-[10px] w-[100px] mb-2`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-md bg-gray-300 h-[30px] w-full mb-4`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-full bg-gray-300 h-[10px] w-[100px] mb-2`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-md bg-gray-300 h-[30px] w-full mb-4`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-full bg-gray-300 h-[12px] w-[120px] mb-2`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-full bg-gray-300 h-[10px] w-[100px] mb-3`}
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant={"h1"}
                    className={`mb-2 h-2 rounded-md bg-gray-200 h-[30px] w-[30px] mb-4`}
                >
                    &nbsp;
                </Typography>

            </> :
            option === 'inputs' ?
                <>

                    <div className="flex flex-row mb-4 items-center">

                        <Typography
                            as="div"
                            variant={"h1"}
                            className={`h-2 rounded-full bg-gray-300 h-[30px] w-[70px] mr-4`}
                        >
                            &nbsp;
                        </Typography>

                        <Typography
                            as="div"
                            variant={"h1"}
                            className={`h-2 rounded-full bg-gray-300 h-[30px] w-[70px] mr-4`}
                        >
                            &nbsp;
                        </Typography>

                        <Typography
                            as="div"
                            variant={"h1"}
                            className={`h-2 rounded-full bg-gray-300 h-[30px] w-[70px]`}
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            className={`flex justify-center items-center h-2 rounded-full h-[30px] w-[50px] mr-4`}
                        >
                            <GoPlus className="text-gray-400" />

                        </Typography>
                    </div>

                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-full bg-gray-300 h-[12px] w-[120px] mb-2`}
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-md bg-gray-300 h-[30px] w-full mb-4`}
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-full bg-gray-300 h-[12px] w-[120px] mb-2`}
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-md bg-gray-300 h-[30px] w-full mb-4`}
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-full bg-gray-300 h-[12px] w-[120px] mb-2`}
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant={"h1"}
                        className={`mb-2 h-2 rounded-md bg-gray-300 h-[30px] w-full mb-4`}
                    >
                        &nbsp;
                    </Typography>



                </> : <></>}





        {/*

{[...Array(12)].map((_, index) => (
            <Typography
                key={index}
                as="div"
                variant={index === 0 ? "h1" : "paragraph"}
                className={`mb-2 h-2 rounded-full bg-gray-300 ${index === 0 ? 'h-3 w-56 mb-4' : ''}`}
            >
                &nbsp;
            </Typography>
        ))}

            */}

    </div>
);
CustomSkeleton.displayName = "CustomSkeleton";



export const LoadingDisplay = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Spinner color="amber" className="h-16 w-16 text-blue-500" />
    </div>
);
LoadingDisplay.displayName = "LoadingDisplay";