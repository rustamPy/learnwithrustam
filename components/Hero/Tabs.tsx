'use client';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";


const HeroTabs = () => {

    const courses = [
        {
            category: 'general',
            level: 'easy',
            duration: ['3', 'month'],
            status: true,
            title: "General IT - Entry",
            image: "",
            desc: `This course is designed to provide you with a solid foundation in Information Technology(IT) concepts and practices. 
            It serves as an essential stepping stone for individuals who are new to the world of IT`,
            price: ["$", "129", "year"],
            options: [
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Complete documentation",
                },
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Working materials in Sketch",
                },
                {
                    icon: (
                        <MinusCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Integration help",
                },
                {
                    icon: (
                        <MinusCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "40GB Cloud storage",
                },
                {
                    icon: (
                        <MinusCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Support team full assist",
                },
            ],
        },
        {
            category: 'general',
            level: 'medium',
            duration: ['3', 'month'],
            status: true,
            title: "General IT - Intermediate",
            image: "",
            desc: `This course covers a range of more complex topics and subjects to build upon the foundational knowledge gained in the Entry level of IT.`,
            price: ["$", "299", "year"],
            options: [
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Complete documentation",
                },
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Working materials in Sketch",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Integration help",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "40GB Cloud storage",
                },
                {
                    icon: (
                        <MinusCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Support team full assist",
                },
            ],
        },
        {
            category: 'python',
            level: 'medium',
            duration: ['4', 'month'],
            status: true,
            title: "Python - Entry",
            image: "",
            desc: `This course serves as an entrance to coding and software development through the Python. 
            It encompasses the fundamental principles of the Python programming language and delves into the core concepts of Object-Oriented Programming (OOP).`,
            price: ["$", "299", "year"],
            options: [
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Complete documentation",
                },
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Working materials in Sketch",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Integration help",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "40GB Cloud storage",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Support team full assist",
                },
            ],
        },
        {
            category: 'python',
            level: 'medium',
            duration: ['4', 'month'],
            status: false,
            title: "Python - Intermediate",
            image: "",
            desc: `todo`,
            price: ["$", "299", "year"],
            options: [
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Complete documentation",
                },
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Working materials in Sketch",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Integration help",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "40GB Cloud storage",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Support team full assist",
                },
            ],
        },
        {
            category: 'python',
            level: 'medium',
            duration: ['4', 'month'],
            status: false,
            title: "Python - Advanced",
            image: "",
            desc: `todo`,
            price: ["$", "299", "year"],
            options: [
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Complete documentation",
                },
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                    ),
                    info: "Working materials in Sketch",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Integration help",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "40GB Cloud storage",
                },
                {
                    icon: (
                        <CheckCircleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-900"
                        />
                    ),
                    info: "Support team full assist",
                },
            ],
        },
    ];

    const [categories, setCategories] = useState([])

    // Getting unique categories
    useEffect(() => {
        courses.map(c => {
            const uniqueCategories = new Set(courses.map(c => c.category));
            setCategories(Array.from(uniqueCategories));
        })
    }, [])

    console.log(categories);

    const data = [
        {
            label: "General IT",
            value: "html",
            desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
        },
        {
            label: "React",
            value: "react",
            desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Vue",
            value: "vue",
            desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            label: "Angular",
            value: "angular",
            desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Svelte",
            value: "svelte",
            desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
    ];

    return (
        <>

            <Typography
                className="mb-4 font-bold text-lg mt-[40px]"
            >
                Pricing Plans
            </Typography>
            <Typography
                variant="h1"
                className="mb-4 !leading-snug lg:!text-4xl !text-2xl max-w-2xl"
            >
                Invest in a plan that&apos;s as ambitious as your corporate goals.
            </Typography>
            <Typography
                variant="lead"
                className="mb-10 font-normal !text-gray-500 max-w-xl"
            >
                Compare the benefits and features of each plan below to find the ideal
                match for your business&apos;s budget and ambitions.
            </Typography>


            <Tabs value="general" className="mt-20 max-w-[1000px]">
                <TabsHeader
                    className="dark:bg-white !text-white"
                    indicatorProps={{
                        className: "bg-lwr-orange",
                    }}
                >

                    {categories.map(c => (
                        <Tab key={c} value={c}>
                            <Typography className="capitalize font-bold mb-1">
                                {c}
                            </Typography>

                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {categories.map(category => {
                        const coursesByCategory = courses.filter(c => c.category === category);
                        console.log(coursesByCategory)
                        return (<TabPanel key={category} value={category} className="dark:text-white">
                            <CoursesCards courses={coursesByCategory} />
                        </TabPanel>)
                    })}
                </TabsBody>
            </Tabs>
        </>
    );
}

interface CoursesCardsProps {
    courses: object[]
}
const CoursesCards = ({ courses }: CoursesCardsProps) => {

    return (
        <section className="py-24 px-8">
            <div className="container mx-auto">
                <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                    {courses.map(({ title, desc, options, price }, key) => (
                        <CourseCard
                            key={key}
                            title={title}
                            desc={desc}
                            price={price}
                            options={options}
                        />
                    ))}
                </div>
                <Typography
                    variant="small"
                    className="mt-10 font-normal !text-gray-500"
                >
                    You have Free Unlimited Updates and Premium Support on each package.
                    You also have 30 days to request a refund.
                </Typography>
            </div>
        </section>
    );
}

interface CoursesCardProps {
    title: string;
    desc: string;
    price: string[];
    options: {
        icon: React.ReactNode;
        info: string;
    }[];
    icon: React.ReactNode;
    children: React.ReactNode;
}
const CourseCard = ({ title, desc, price, options }: CoursesCardProps) => {
    return (
        <Card variant="gradient" color="white">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="!m-0 inset-0 h-full w-full p-6"
            >
                <div className="absolute inset-0 m-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="capitalize font-bold mb-1"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="small"
                        className="font-normal !text-gray-500"
                    >
                        {desc}
                    </Typography>
                    <Typography
                        variant="h3"
                        color="blue-gray"
                        className="!mt-4 flex gap-1 !text-4xl"
                    >
                        {price[0]}
                        {price[1]}
                        <Typography
                            as="span"
                            color="blue-gray"
                            className="-translate-y-0.5 self-end opacity-70 text-lg font-bold"
                        >
                            /{price[2]}
                        </Typography>
                    </Typography>
                </div>
            </CardHeader>
            <CardBody className="pt-0">
                <ul className="flex flex-col gap-3 mb-6">
                    {options.map((option, key) => (
                        <li
                            key={key}
                            className="flex items-center gap-3 text-gray-700"
                        >
                            {option.icon}
                            <Typography
                                variant="small"
                                className="font-normal text-inherit"
                            >
                                {option.info}
                            </Typography>
                        </li>
                    ))}
                </ul>
                <Button fullWidth variant="gradient" color="gray">
                    details
                </Button>
            </CardBody>
        </Card>

    );
}


export default HeroTabs;