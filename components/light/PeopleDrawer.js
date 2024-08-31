
import {
    Drawer,
    Typography,
    IconButton
} from "@material-tailwind/react";

import Image from 'next/image';
import RasulFront from '@/app/(light)/light/people/rasul/rasul.jpeg';
import TeymurFront from '@/app/(light)/light/people/teymur/teymur.jpg';
import SalmanFront from '@/app/(light)/light/people/salman/salman.jpg';


const people = [
    {
        name: "Rasul Karimov",
        role: "ML Research Engineer",
        imageSrc: RasulFront,
        profileUrl: "/light/people/rasul"
    },
    {
        name: "Salman Abdullayev",
        role: "iOS Developer",
        imageSrc: SalmanFront,
        profileUrl: "/light/people/salman"
    },
    {
        name: "Teymur Abdullayev",
        role: "Chess Player",
        imageSrc: TeymurFront,
        profileUrl: "/light/people/teymur"
    },
];


const PeoplePanel = ({ open, setOpen }) => {
    const handleClose = () => setOpen(false)

    return (

        <Drawer open={open} onClose={handleClose} className="p-4">
            <div className="mb-6 flex items-center justify-between">
                <Typography className="mb-4 text-3xl font-bold text-gray-900">
                    Gentlemen's
                    <span className="px-2 py-1 relative inline-block">
                        <svg className="stroke-current bottom-0 absolute text-blue-300 -translate-x-1 -translate-y-1" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                        </svg>
                        <span className="relative">Quarterly</span>
                    </span>
                </Typography>
                <IconButton variant="text" color="blue-gray" onClick={handleClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </div>

            <div className="space-y-4">
                {people.map((person, index) => (
                    <a
                        key={index}
                        href={person.profileUrl}
                        className="flex items-center p-2 bg-gray-50 rounded shadow hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                        <div className="relative w-16 h-16">
                            <Image
                                src={person.imageSrc}
                                alt={person.name}
                                width={0}
                                height={0}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">{person.name}</h3>
                            <p className="text-gray-600">{person.role}</p>
                        </div>
                    </a>
                ))}
            </div>
        </Drawer>

    )

}

export default PeoplePanel;