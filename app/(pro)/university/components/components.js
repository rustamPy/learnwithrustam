'use client'
import React from 'react';
import { Link2 } from 'lucide-react'
import {
    Book,
    Calculator,
    Flask,
    Globe2,
    User,
    Calendar,
    Clock
} from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


const SubjectCard = ({ icon: Icon, title, teacher, dueDate, university, tasks }) => {

    return (
        <Card className="mb-4">

            <CardHeader className='shadow-none bg-gray-100'>
                <p className='p-4'>{title}</p>
            </CardHeader>

            <CardBody>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{teacher}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe2 className="h-4 w-4" />
                        <span>{university}</span>
                    </div>
                    <div className="mt-4">
                        <div className="font-medium mb-2">Upcoming Tasks:</div>
                        <ul className="space-y-2">
                            {tasks.map((task, index) => (
                                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                    <span className="flex items-center gap-2">
                                        <Book className="h-4 w-4 text-gray-500" />
                                        {task.title}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>{task.due}</span>
                                    </div>

                                    <a href={`/university/?id=${task.id}`}><Link2 /></a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
export const HomeworkView = () => {

    const subjects = [
        {
            icon: Calculator,
            title: "Website Projects",
            teacher: "Przemysław Nowak",
            university: "WAB",
            tasks: [
                { title: "Simple Components", due: "Oct 23", id: "wp-simple" }
            ]
        }
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-16">
                <h1 className="text-3xl font-bold text-gray-900">Homework Dashboard</h1>
            </div>

            <div className="grid gap-6">
                {subjects.map((subject, index) => (
                    <SubjectCard key={index} {...subject} />
                ))}
            </div>
        </div>
    );
};

export default HomeworkView;