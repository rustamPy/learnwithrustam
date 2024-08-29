'use client';
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Typography, Button, Chip, Tooltip } from "@material-tailwind/react";
import { motion } from "framer-motion";

const GroupCard = ({ groups }) => {
    const [expandedGroups, setExpandedGroups] = useState({});
    const [randomTip, setRandomTip] = useState("");

    const tips = [
        "Try solving one question from each group daily!",
        "Consistency is key in mastering algorithms.",
        "Don't forget to review and optimize your solutions.",
        "Stuck? Take a break and come back with fresh eyes.",
        "Collaborate with others to learn new approaches.",
    ];

    useEffect(() => {
        const tipIndex = Math.floor(Math.random() * tips.length);
        setRandomTip(tips[tipIndex]);
    }, []);

    const handleExpandToggle = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const getRandomColor = () => {
        const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <section className="container mx-auto py-8 px-4">
            <Card shadow={false} className="border border-gray-300">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6"
                >
                    <div>
                        <Typography variant="h1" className="!text-3xl mb-2 text-white">
                            Our Local Top LeetCode Problem Groups
                        </Typography>
                        <Typography className="!text-lg font-normal text-blue-100">
                            Explore and master 3 popular question categories
                        </Typography>
                    </div>
                    <Tooltip content={randomTip}>
                        <Chip
                            value="Daily Tip"
                            className="bg-white text-blue-500 cursor-pointer hover:bg-blue-50 transition-all duration-300"
                        />
                    </Tooltip>
                </CardHeader>
                <CardBody className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-6 py-8">
                    {groups.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardBody className="p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <Typography variant="h5" color="blue-gray" className="font-bold">
                                            {group.name}
                                        </Typography>
                                        <Chip
                                            value={`${group.count} Q`}
                                            size="sm"
                                            variant="gradient"
                                            color={getRandomColor()}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {group.questions.slice(0, 3).map((q, key) => (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: key * 0.1 }}
                                            >
                                                <Typography variant="small" className="font-medium">
                                                    <a href={`/leetcode/${q.slug}`} className="hover:text-blue-500 transition-colors duration-200">
                                                        {q.title}
                                                    </a>
                                                </Typography>
                                            </motion.div>
                                        ))}
                                    </div>
                                    {group.questions.length > 3 && (
                                        <div className="flex flex-col-reverse">
                                            <Button
                                                size="sm"
                                                variant="text"
                                                color="blue"
                                                className="flex items-center gap-2 p-0 mt-4"
                                                onClick={() => handleExpandToggle(group.name)}
                                            >
                                                {expandedGroups[group.name] ? (
                                                    <>
                                                        <span>Show Less</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Show More</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </>
                                                )}
                                            </Button>
                                            {expandedGroups[group.name] && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-2 space-y-2"
                                                >
                                                    {group.questions.slice(3).map((q, key) => (
                                                        <Typography key={key + 3} variant="small" className="font-medium">
                                                            <a href={`/leetcode/${q.slug}`} className="hover:text-blue-500 transition-colors duration-200">
                                                                {q.title}
                                                            </a>
                                                        </Typography>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </CardBody>
            </Card>
        </section>
    );
};

export default GroupCard;