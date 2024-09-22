'use client';
import { useState, useEffect, useRef } from 'react';
import { Select, Option } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IoWarningOutline } from "react-icons/io5";


const FilterSortBar = ({

    showCategoryFilter = true,
    onCategoryChange,
    selectedCategory,
    categories,
    label,

    showTopicFilter = true,
    allTopics = [],
    selectedTopics = [],
    onTopicChange,
    onTopicReset,

    showSortOrder = true,
    sortOrder,
    sortOptions = [
        { value: 'asc', label: 'Title (A-Z)' },
        { value: 'desc', label: 'Title (Z-A)' }
    ],
    onSortOrderChange,
    itemsCount = 0,
    showCoursesPerPage = true,
    coursesPerPage,
    onCoursesPerPageChange,
    isProfilePage
}) => {
    const [searchTopic, setSearchTopic] = useState('');
    const [showAllTopics, setShowAllTopics] = useState(false);
    const [isTopicBoxOpen, setIsTopicBoxOpen] = useState(false);
    const [tallerBox, setTallerBox] = useState(false);
    const COLOR_MAP = {
        'Easy': 'lwr-wecode-easy-100',
        "Beginner": 'lwr-wecode-easy-100',
        'Medium': 'lwr-wecode-medium-100',
        'Hard': 'lwr-wecode-hard-100'
    };

    const filteredTopics = allTopics.filter(topic =>
        topic && typeof topic === 'string' && topic.toLowerCase().includes(searchTopic.toLowerCase())
    );

    const visibleTopics = showAllTopics ? filteredTopics : filteredTopics.slice(0, 10);

    const handleTopicClick = (topic) => {
        onTopicChange(topic);
    }

    const handleExpandTopics = () => {
        setShowAllTopics(!showAllTopics);
        setTallerBox(!tallerBox);
    }

    const topicBoxRef = useRef(null);

    const handleClickOutside = (event) => {
        if (!topicBoxRef?.current?.contains(event.target)) {
            setIsTopicBoxOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, []);


    return (
        <div className="flex flex-col space-y-3">
            <span className='text-blue-500'> </span>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                {showCategoryFilter && (
                    <div className="flex items-center space-x-1">
                        <Select
                            color="blue"
                            value={selectedCategory}
                            label={label}
                            onChange={(value) => onCategoryChange(value)}
                            className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
                            labelProps={{
                                className: "text-gray-700 dark:text-gray-200"
                            }}
                            menuProps={{
                                className: "bg-white dark:bg-gray-900 border-none"
                            }}
                        >
                            {categories.map((category) => (
                                <Option key={category} value={category} className="text-sm text-left font-semibold mb-1 dark:focus:bg-gray-700 text-gray-800 dark:text-blue-500">
                                    <span className={`text-${COLOR_MAP[category] ? COLOR_MAP[category] : ''} dark:text-${COLOR_MAP[category] ? COLOR_MAP[category] : ''}`}>{category}</span>
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
                {showSortOrder && (
                    <div className="flex items-center space-x-1">
                        <Select
                            color="purple"
                            value={sortOrder}
                            onChange={(value) => onSortOrderChange(value)}
                            label="Sort by"
                            className={`text-xs bg-gray-200 dark:bg-gray-900 text-gray-700 ${itemsCount === 1 ? "dark:text-gray-600" : "dark:text-gray-200"}`}
                            labelProps={{
                                className: "text-gray-700 dark:text-gray-200"
                            }}
                            menuProps={{
                                className: "bg-white dark:bg-gray-900 border-none"
                            }}
                            disabled={itemsCount === 1}
                        >
                            {sortOptions.map((option) => (
                                <Option key={option.value} value={option.value} className="text-sm text-gray-800 dark:text-purple-400 mb-1 font-semibold ">
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
                {showTopicFilter && (
                    <div className="flex items-center relative">
                        {!(allTopics[0] == undefined) ? (
                            <button
                                className="flex items-center text-sm rounded-lg px-3 py-2.5 border border-blue-gray-200 text-left cursor-pointer focus:outline-none whitespace-nowrap bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 text-gray-700 dark:text-gray-300"
                                onClick={() => setIsTopicBoxOpen(prev => !prev)}>
                                <div>
                                    <span>Topics</span>
                                    <span className="ml-2 h-[18px] rounded-full px-1.5 text-center text-xs leading-normal bg-gray-200 text-gray-800">
                                        {selectedTopics.length}
                                    </span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" className={`w-4.5 h-4.5 ml-3 pointer-events-none transition-transform ${isTopicBoxOpen ? 'rotate-180' : ''}`}>
                                    <path fillRule="evenodd" d="M4.929 7.913l7.078 7.057 7.064-7.057a1 1 0 111.414 1.414l-7.77 7.764a1 1 0 01-1.415 0L3.515 9.328a1 1 0 011.414-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        ) : (
                            <button
                                className="flex items-center text-sm rounded-lg px-3 py-2.5 text-left cursor-not-allowed focus:outline-none whitespace-nowrap bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 text-gray-800 dark:text-gray-600"
                                disabled>
                                <div>
                                    <span>No available topic</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" className={`w-4.5 h-4.5 ml-3 pointer-events-none transition-transform ${isTopicBoxOpen ? 'rotate-180' : ''}`}>
                                    <path fillRule="evenodd" d="M4.929 7.913l7.078 7.057 7.064-7.057a1 1 0 111.414 1.414l-7.77 7.764a1 1 0 01-1.415 0L3.515 9.328a1 1 0 011.414-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        )}

                        {isTopicBoxOpen && (
                            <div ref={topicBoxRef} className={`absolute top-full left-0 z-10 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-lg w-80 h-auto max-h-[28rem]`}>
                                <div className="relative mb-4 dark:text-white">
                                    <div className='absolute inset-y-1.5 ml-2 flex items-center text-gray-6 dark:text-dark-gray-6 pointer-events-none left-0'>
                                        <MagnifyingGlassIcon className="h-5 w-5 dark:text-white" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Filter topics"
                                        onChange={(e) => setSearchTopic(e.target.value)}
                                        className='block w-full box-border bg-gray-100 focus:bg-gray-200 dark:bg-gray-800 dark:focus:bg-gray-700 dark:placeholder:text-gray-500 text-sm rounded-md outline-none border-none py-1.5 pl-9 pr-3 mb-4'
                                    />
                                </div>
                                <div className={`flex flex-wrap gap-1 max-h-[20rem] overflow-auto mb-8`}>
                                    {visibleTopics.length === 0 ? (
                                        <div className="flex items-center justify-center w-full h-20 text-gray-500 dark:text-gray-400">
                                            <IoWarningOutline className='w-5 h-5 mr-2' />
                                            <span className="text-sm font-medium">No topics available</span>
                                        </div>
                                    ) : (
                                        <>
                                                {visibleTopics.map((topic) => (
                                                    topic && typeof topic === 'string' && (
                                                        <span
                                                            key={topic}
                                                            onClick={() => handleTopicClick(topic)}
                                                            className={`inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full ${selectedTopics.includes(topic) ? 'bg-blue-500 dark:bg-blue-600 text-gray-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} cursor-pointer transition-all m-1`}
                                                        >
                                                            {topic}
                                                        </span>
                                                    )
                                                ))}

                                                {filteredTopics.length > 10 ? (
                                                    !showAllTopics && (filteredTopics.length > visibleTopics.length) ? (
                                                        <span
                                                            className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 hover:dark:bg-blue-800 cursor-pointer transition-all m-1"
                                                            onClick={() => handleExpandTopics()}
                                                        >
                                                            +{filteredTopics.length - visibleTopics.length} more
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 hover:dark:bg-blue-800 cursor-pointer transition-all m-1"
                                                            onClick={() => handleExpandTopics()}
                                                        >
                                                            Show Less
                                                        </span>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </>
                                    )}

                                </div>
                                <div className="absolute bottom-2 right-2">
                                    <button
                                        onClick={() => {
                                            onTopicReset();
                                            setSearchTopic('');
                                            setShowAllTopics(false);
                                            setTallerBox(false);
                                        }}
                                        className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {showCoursesPerPage && !isProfilePage && (
                    <div className="flex items-center space-x-1">
                        <Select
                            value={`${coursesPerPage}`}
                            onChange={(value) => onCoursesPerPageChange(value)}
                            color="blue"
                            className="text-xs bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                            label='Courses per page'
                        >
                            <Option value="4">4 per page</Option>
                            <Option value="12">12 per page</Option>
                            <Option value="24">24 per page</Option>
                        </Select>
                    </div>
                )}

                {itemsCount > 0 && (<div className='flex items-center text-sm space-x-1 w-54 bg-gray-100 p-2 dark:bg-gray-900 rounded-md'>Selected item{itemsCount > 0 ? 's' : ''}: <span className='font-bold ml-2'>{itemsCount}</span></div>)}
            </div>
        </div>
    );
}

export default FilterSortBar;
