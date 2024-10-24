'use client';
import React, { useState, useEffect } from 'react';
import { useNavbarVisibility } from './NavbarVisibilityContext';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { debounce } from 'lodash';
import { MdConstruction } from 'react-icons/md';
import Logo from '@/components/pro/Logo';
import WeCodeLogo from '@/components/pro/WeCodeLogo'

import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from '@material-tailwind/react';
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import { FaLanguage } from "react-icons/fa";

import { FiVideo } from 'react-icons/fi';

import ThemeToggle from '@/components/pro/ThemeToggle'; // Adjust import if needed
import BannerSection from '@/components/pro/Header/Banner';

const RESOURCES = [
    {
        title: 'WeCode',
        description: 'Find WeCode solutions by me',
        href: '/wecode',
        icon: <WeCodeLogo linked={false} />,
    },
    {
        title: 'Polski. Krok po Kroku',
        description: 'Audio Guide for Polish language',
        href: '/learnpolish',
        icon: <FaLanguage size={25} />,
    },
    {
        title: 'IT Video Tutorials',
        description: 'Exclusive tutorials only here',
        href: '/videos/tutorials',
        icon: <FiVideo size={25} />,
    },
];

const NAVITEMS = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Features',
        href: '/#features',
    },
    {
        title: 'Courses',
        href: '/courses',
    },
    {
        title: 'Get Together',
        href: '/#together',
    },
    {
        title: 'About Me',
        href: '/about',
    },
    {
        title: 'Contact Me',
        href: '#',
        construction: 1,
    },
];

function ResourcesMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const renderItems = RESOURCES.map(
        ({ icon, title, description, href, construction }, key) => (
            <a href={href} key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg dark:hover:bg-gray-700">
                    <div className="flex items-center justify-center rounded-lg p-2 text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1">
                        {icon}
                    </div>
                    <div>
                        {construction ? (
                            <Typography
                                variant="h5"
                                className="flex items-center text-sm text-red-800 font-semibold"
                            >
                                {title} <MdConstruction className="text-red-800 ml-2 inline-block" />
                            </Typography>
                        ) : (
                            <Typography
                                variant="h6"
                                className="flex items-center text-sm font-bold text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1"
                            >
                                {title}
                            </Typography>
                        )}
                        <Typography
                            variant="paragraph"
                            className="text-xs font-medium text-lwr-general-blue-light-theme-color-2 dark:text-lwr-general-gray-dark-theme-color-2"
                        >
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </a>
        ),
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-bold">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-bold text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1 dark:hover:bg-gray-700"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Resources
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? 'rotate-180' : ''}`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList style={{ border: 0 }} className="hidden max-w-screen-xl rounded-xl dark:border-none lg:block dark:bg-lwr-general-gray-dark-theme-color-3 dark:text-red-500">
                    <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

const NavList = ({ closeNavbar }) => (
    <List className="mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        {NAVITEMS.map((item, key) => (
            <Typography
                key={key}
                as="a"
                href={item.href}
                variant="small"
                className="font-bold text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1"
            >
                <ListItem
                    onClick={closeNavbar}
                    className={`flex items-center gap-2 py-2 pr-4 ${item.construction ? 'text-red-800 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-lwr-general-gray-dark-theme-color-1' : 'dark:hover:bg-gray-700 dark:hover:text-lwr-general-gray-dark-theme-color-1'}`}
                >
                    {item.construction && <MdConstruction className="text-red-800 inline-block" />}
                    {item.title}
                </ListItem>
            </Typography>
        ))}
        <ResourcesMenu />
    </List>
);

const UserProfile = ({ user }) => (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <a href="/profile"><img src={user.user?.image} width={30} style={{ borderRadius: 50 }} /></a>
    </div>
);

const NavbarWithMegaMenu = () => {
    const { isNavbarVisible } = useNavbarVisibility(); // Use the context hook
    const [openNav, setOpenNav] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session, status } = useSession();

    const pathname = usePathname();
    const goLight = () => {
        return '/light' + pathname
    }


    useEffect(() => {
        const handleScroll = debounce(() => {
            setIsScrolled(window.scrollY > 90);
        }, 2);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isNavbarVisible) return null; // Conditionally render the Navbar 

    return (
        <>
            <Navbar
                blurred
                className={`border-0 sticky mx-auto transition-all duration-300 ${isScrolled
                    ? 'top-2 mx-auto rounded-2xl px-2 py-2'
                    : 'top-0 max-w-full px-4 py-4 rounded-none'
                    } dark:bg-lwr-navbar-dark-theme-color z-20 overflow-y-auto pb-2`}
            >
                <BannerSection isScrolled={isScrolled} />
                <div className="flex items-center justify-between text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color pt-8">
                    <Logo variant={'lg'} customClass="lg:ml-2" />
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <div className="hidden gap-2 lg:flex flex items-center">
                        {
                            status === 'loading' || status === 'authenticated' ? (
                                <>
                                    <UserProfile user={session} />
                                    <Button variant="filled" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
                                        Sign out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <a href="/signin">
                                        <Button variant="filled" size="sm">
                                            Sign in
                                        </Button>
                                    </a>
                                </>
                            )
                        }
                        <ThemeToggle />
                        <a href={goLight()} className='text-xs mr-4 text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1'>Simple</a>

                    </div>
                    <IconButton
                        variant="text"
                        className="lg:hidden dark:text-lwr-blue-color-500"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList closeNavbar={() => setOpenNav(false)} />
                    <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                        {
                            status === 'loading' || status === 'authenticated' ? (
                                <>
                                    <UserProfile user={session} />
                                    <Button variant="filled" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
                                        Sign out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <a href="/signin">
                                        <Button variant="filled" size="sm">
                                            Sign in
                                        </Button>
                                    </a>
                                </>
                            )
                        }
                        <ThemeToggle />
                        <a href={goLight()} className='text-xs mr-4 text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1'>Simple</a>
                    </div>
                </Collapse>
            </Navbar>
        </>
    );
};

export default NavbarWithMegaMenu;
