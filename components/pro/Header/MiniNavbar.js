'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import MiniLogo from '@/components/pro/MiniLogo';
import { PiLineVertical } from 'react-icons/pi';



import { fetchAllQuestions } from '@/app/(pro)/leetcode/utils';


import {
    Navbar,
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from '@material-tailwind/react';


import ThemeToggle from '@/components/pro/ThemeToggle';

const UserProfile = ({ user }) => (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <a href="/profile"><img src={user.user?.image} width={30} style={{ borderRadius: 50 }} /></a>
    </div>
);

const DrawerWithNavigation = () => {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <Fragment>
            <Button onClick={openDrawer}>Open Drawer</Button>
            <Drawer
                open={open}
                onClose={closeDrawer}
                className="z-50"  // Set z-index high enough
                overlay={true}  // Enable overlay (optional, if not handled by the component)
            >
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        Material Tailwind
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
                <List>
                    {/* List items */}
                </List>
                <Button className="mt-3 ml-5" size="sm">
                    Documentation
                </Button>
            </Drawer>
        </Fragment>
    );
};


const MiniNavbar = ({ children }) => {

    const [openNav, setOpenNav] = useState(false);
    const { data: session, status } = useSession();
    const [questions, setQuestions] = useState([])
    const [open, setOpen] = useState(true);

    useEffect(() => {

        const getData = async () => {
            try {
                const data = await fetchAllQuestions();
                setQuestions(data.questions)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();

    }, []);

    const pathname = usePathname();
    const goLight = () => {
        return '/light' + pathname
    }

    console.log(questions)



    return (
        <>
            <Navbar className='max-w-full py-0 rounded-none shadow-none'>
                <div className="flex flex-row items-center text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color">
                    <MiniLogo />
                    <PiLineVertical className='text-gray-300 dark:text-gray-500' />

                    {children}
                </div>
            </Navbar>
        </>
    );
};

export default MiniNavbar;