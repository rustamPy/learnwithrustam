'use client';
import React, { useState, useCallback } from 'react';
import { Panel } from 'react-resizable-panels';
import { Chip, Button, Tooltip } from '@material-tailwind/react';
import { BsFileText, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { WindowPanel, CustomSkeleton } from './Components';
import { IoMdInformationCircleOutline } from "react-icons/io";

const QuestionPanel = ({ question }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const toggleBookmark = useCallback(() => {
        setIsBookmarked(prev => !prev);
        // Here you would typically also update this in your backend or local storage
    }, []);

    const toggleHint = useCallback(() => {
        setShowHint(prev => !prev);
    }, []);

    const renderDifficulty = useCallback((level) => {
        const colors = {
            Easy: 'green',
            Medium: 'yellow',
            Hard: 'red'
        };
        return (
            <Chip
                value={level}
                color={colors[level] || 'blue'}
                variant="outlined"
                className="ml-2 text-xs font-semibold"
            />
        );
    }, []);

    const renderTags = useCallback((tags) => {
        return tags.map((tag, index) => (
            <Chip
                key={index}
                value={tag}
                color="blue-gray"
                className="mr-2 mb-2 text-xs"
            />
        ));
    }, []);

    return (
        <Panel minSize={20} defaultSize={30}>
            <WindowPanel
                tabs={[
                    { name: 'Description', icon: <BsFileText />, color: "text-blue-500" },
                    { name: 'Editorial', icon: <FaRegLightbulb />, color: "text-yellow-500" }
                ]}
            >
                {/* Description tab content */}
                <div className="p-4 h-full overflow-auto">
                    {!question ? (
                        <div className="flex justify-center items-center h-full">
                            <CustomSkeleton />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
                                <div className="flex items-center">
                                    {renderDifficulty(question.level)}
                                    <Tooltip content={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}>
                                        <Button
                                            color="blue-gray"
                                            variant="text"
                                            className="ml-2 p-2"
                                            onClick={toggleBookmark}
                                        >
                                            {isBookmarked ? <BsBookmarkFill size={20} /> : <BsBookmark size={20} />}
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="mb-4">
                                {renderTags(question.tags || [])}
                            </div>
                            <div className="prose max-w-full text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: question?.content }} />
                            {question.hint && (
                                <div className="mt-4">
                                    <Button
                                        color="blue"
                                        variant="outlined"
                                        className="flex items-center"
                                        onClick={toggleHint}
                                    >
                                        <IoMdInformationCircleOutline className="mr-2" />
                                        {showHint ? "Hide Hint" : "Show Hint"}
                                    </Button>
                                    {showHint && (
                                        <div className="mt-2 p-3 bg-blue-50 rounded-md text-blue-800">
                                            {question.hint}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Editorial tab content */}
                <div className="p-4 h-full overflow-auto">
                    <h2 className="text-xl font-semibold mb-4">Editorial</h2>
                    {question?.editorial ? (
                        <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: question.editorial }} />
                    ) : (
                        <p className="text-gray-600">No editorial available for this question yet.</p>
                    )}
                </div>
            </WindowPanel>
        </Panel>
    );
};

export default QuestionPanel;