'use client';
import React, { useState, useCallback, useRef } from 'react';
import {
    Button,
    Tooltip,
    Accordion,
    AccordionHeader,
    AccordionBody
} from '@material-tailwind/react';
import { BsFileText, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { MdOutlineTopic } from "react-icons/md";
import { Panel } from 'react-resizable-panels';
import { WindowPanel, CustomSkeleton } from './Components';
import { COLOR_MAP } from '@/app/(pro)/leetcode/utils'
import { FaHatWizard } from "react-icons/fa6";


const QuestionPanel = ({ question }) => {
    const colors = {
        Easy: 'green',
        Medium: 'yellow',
        Hard: 'red'
    };

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [questionFullScreen, setQuestionFullScreen] = useState(false);



    const scrollableRef = useRef(null);

    const scrollToAccordion = (href) => {
        setActiveAccordion(href);

        setTimeout(() => {
            const targetAccordion = document.getElementById(href);
            if (targetAccordion && scrollableRef.current) {
                const container = scrollableRef.current;
                const containerRect = container.getBoundingClientRect();
                const targetRect = targetAccordion.getBoundingClientRect();
                const targetTopRelativeToContainer = targetRect.top - containerRect.top;

                const accordionBody = targetAccordion.querySelector('.accordion-body');
                const accordionBodyHeight = accordionBody ? accordionBody.scrollHeight : 0;

                const newScrollTop = container.scrollTop + targetTopRelativeToContainer - 20; // 20px padding

                container.scrollTo({
                    top: newScrollTop,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    const updatedTargetRect = targetAccordion.getBoundingClientRect();
                    const updatedContainerRect = container.getBoundingClientRect();
                    const bottomOverflow = (updatedTargetRect.bottom + accordionBodyHeight) - updatedContainerRect.bottom;

                    if (bottomOverflow > 0) {
                        container.scrollTo({
                            top: container.scrollTop + bottomOverflow,
                            behavior: 'smooth'
                        });
                    }
                }, 500);
            }
        }, 0);
    };

    const toggleBookmark = useCallback(() => {
        setIsBookmarked(prev => !prev);
    }, []);

    const additionalButtons = [
        { name: question.level, icon: '', content: '', href: undefined },
        { name: 'Topics', icon: <MdOutlineTopic />, content: question.topics, href: 'topics' },
        { name: 'Companies', icon: <MdWork />, content: question.companies, href: 'companies' },
        { name: 'Hint', icon: <FaRegLightbulb />, content: question.hint, href: 'hint' },
    ];


    return (
        <Panel minSize={20} defaultSize={30}>
            <WindowPanel
                tabs={[
                    { name: 'Description', icon: <BsFileText />, color: "text-blue-800" },
                    { name: 'Editorial', icon: <FaHatWizard />, color: "text-yellow-800" }
                ]}
                isFullScreen={questionFullScreen}
                setFullScreen={setQuestionFullScreen}
            >
                {/* Scrollable Content Area */}
                <div className="p-4 h-full overflow-auto" ref={scrollableRef}>
                    {!question ? (
                        <div className="flex justify-center items-center h-full">
                            <CustomSkeleton />
                        </div>
                    ) : (
                        <>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                                            {question.slug}. {question.title}
                                        </h1>
                                        {/* Additional Buttons */}
                                        <div className="flex">
                                            {additionalButtons.map((b, idx) => (
                                                <div key={idx} className="w-max rounded-full text-[11px] p-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 mr-2">
                                                <a onClick={() => scrollToAccordion(b.href)} className='cursor-pointer'>
                                                    <div className="flex flex-row items-center">
                                                        <div className={`text-[15px] ${b.icon ? 'mr-1' : ''}`}>{b.icon}</div>
                                                        <div className={`${COLOR_MAP[b.name] ? `text-${COLOR_MAP[b.name]} font-semibold` : ''}`}>
                                                            {b.name}
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                        </div>
                                    </div>

                                    {/* Bookmark button */}
                                    <div className="flex items-center dark:text-gray-100">
                                        <Tooltip
                                            placement="bottom"
                                            className="shadow text-[10px] font-normal bg-gray-200 text-gray-800"
                                            content={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                                        >
                                        <Button
                                            color="blue-gray"
                                            variant="text"
                                            className="ml-2 p-2"
                                            onClick={toggleBookmark}
                                        >
                                                {isBookmarked ? <BsBookmarkFill size={15} /> : <BsBookmark size={15} />}
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>

                                <div
                                    className="prose max-w-full text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                                    dangerouslySetInnerHTML={{ __html: question?.content }}
                                />
                                <Details items={additionalButtons} open={activeAccordion} setOpen={setActiveAccordion} />
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


const Details = ({ items, open, setOpen }) =>
    <>
        {items.map((item, index) => (
            item.content && (
                <Accordion key={index} open={open === item.href} id={item.href}>
                    <AccordionHeader
                        onClick={() => setOpen(open === item.href ? null : item.href)}
                        className="border-b-[1px] border-gray-200 dark:border-[#1e1c1cff]" // Change border color
                    >
                        <div className='flex flex-row items-center text-xs text-gray-700 dark:text-gray-300'>
                            <span className='mr-1'>{item.icon}</span>{item.name}
                        </div>
                    </AccordionHeader>
                    <AccordionBody>
                        {typeof item.content === 'string' ? (
                            <div>{item.content}</div>
                        ) : (
                            <div className='flex'>
                                {
                                    item.content.map((i, idx) => (
                                        <div key={idx} className='w-max rounded-full text-[11px] p-1.5 bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300 mr-2'>
                                            {i}
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </AccordionBody>
                </Accordion>
            )
        ))}
    </>


export default QuestionPanel;