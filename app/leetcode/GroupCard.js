'use client';
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Typography, Button } from "@material-tailwind/react";

const GroupCard = ({ groups }) => {
    // State to track expanded questions
    const [expandedGroup, setExpandedGroup] = useState(false);

    const handleExpandToggle = () => {
        setExpandedGroup(!expandedGroup);
    };


    return (
        <section className="px-2 py-4">
            <Card shadow={false} className="border border-gray-300">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-none"
                >
                    <div>
                        <Typography color="blue-gray" variant="h1" className="!text-2xl mb-1">
                            Top Groups
                        </Typography>
                        <Typography color="blue-gray" className="!text-lg font-normal text-gray-600">
                            Highlighting the most popular question groups.
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className="grid xl:grid-cols-3 grid-cols-1 gap-4 px-4">
                    {groups.map((group, index) => (
                        <Card key={index} className="border border-gray-300 overflow-hidden shadow-sm">
                            <CardBody className="p-4">
                                <Typography color="blue-gray" className="!text-base !font-semibold mb-1">
                                    #{index + 1}
                                </Typography>
                                <div className="my-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <Typography color="blue-gray" variant="h6">
                                                {group.name}
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-medium">
                                                {group.count} questions
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {group.questions.slice(0, 3).map((q, key) => (
                                        <Typography
                                            key={key}
                                            variant="text"
                                            className="mb-2 block"
                                        >
                                            <a href={`/leetcode/${q.slug}`}>{q.title}</a>
                                        </Typography>
                                    ))}
                                    {groups.map(group => {
                                        const visibleQuestions = expandedGroup ? group.questions : group.questions.slice(0, 3);
                                        console.log(visibleQuestions)
                                        console.log(group)
                                        console.log(expandedGroup)
                                        return (
                                            <div>
                                                {!expandedGroup && visibleQuestions.length <= group.questions.length ? (
                                                    <span
                                                        className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-blue-200 hover:bg-blue-300 cursor-pointer transition-all m-1"
                                                        onClick={() => handleExpandToggle()}
                                                    >
                                                        +{group.questions.length - 3} more
                                                    </span>
                                                ) : expandedGroup ? (
                                                    <>
                                                        {visibleQuestions.map((q, key) => (
                                                            <Typography
                                                                key={key}
                                                                variant="text"
                                                                className="mb-2 block"
                                                            >
                                                                <a href={`/leetcode/${q.slug}`}>{q.title}</a>
                                                            </Typography>

                                                        ))}

                                                        <span
                                                            className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 hover:dark:bg-blue-800 cursor-pointer transition-all m-1"
                                                            onClick={() => handleExpandToggle()}
                                                        >
                                                            Show Less
                                                        </span>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    })}

                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </CardBody>
            </Card>
        </section>
    );
};

export default GroupCard;
