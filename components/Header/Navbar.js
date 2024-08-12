'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
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
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars4Icon,
    GlobeAmericasIcon,
    NewspaperIcon,
    PhoneIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
    SunIcon,
    TagIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import ThemeToggle from '@/components/ToggleTheme';

const navListMenuItems = [
    {
        title: "Courses",
        description: "Find the perfect course for yourself",
        href: "/courses",
        icon: RectangleGroupIcon,
    },
    {
        title: "About Me",
        description: "Meet and learn about our dedication",
        href: "/about",
        icon: UserGroupIcon,
    },
    {
        title: "Blog",
        description: "Find your answers here",
        icon: Bars4Icon,
    },
    {
        title: "Services",
        description: "Learn how we can help you achieve your goals.",
        icon: SunIcon,
    },
    {
        title: "Contact",
        description: "Find the perfect solution for your needs.",
        icon: PhoneIcon,
    }
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = navListMenuItems.map(
        ({ icon, title, description, href }, key) => (
            <a href={href} key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
                    <div className="flex items-center justify-center rounded-lg p-2 ">
                        {" "}
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 text-gray-900 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm font-bold"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xs !font-medium text-blue-gray-500"
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
                            className="flex items-center gap-2 py-2 pr-4 font-bold text-lwr-blue-color-500"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Resources
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList style={{ border: 0 }} className="hidden max-w-screen-xl rounded-xl lg:block text-lwr-blue-color-500 dark:bg-lwr-gray-color-300">
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

function NavList() {
    return (
        <List className="mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <Typography
                as="a"
                href="/"
                variant="small"
                className="font-bold text-lwr-blue-color-500"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
            </Typography>
            <Typography
                as="a"
                href="/#features"
                variant="small"
                className="font-bold text-lwr-blue-color-500"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">Features</ListItem>
            </Typography>
            <Typography
                as="a"
                href="/contact"
                variant="small"
                className="font-bold text-lwr-blue-color-500"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Contact Me
                </ListItem>
            </Typography>
            <Typography
                as="a"
                href="/#together"
                variant="small"
                className="font-bold text-lwr-blue-color-500"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">Bring Together</ListItem>
            </Typography>
            <NavListMenu />
        </List>
    );
}

export default function NavbarWithMegaMenu() {
    const [openNav, setOpenNav] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session, status } = useSession();


    useEffect(() => {   

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 90);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar
                blurred
                className={`border-0 sticky mx-auto transition-all duration-300 ${isScrolled
                    ? 'top-2 mx-auto rounded-xl px-2 py-2'
                    : 'top-0 max-w-full px-4 py-4'
                    } dark:bg-lwr-gray-color-200 z-50`}
            >
                <div className="flex items-center justify-between text-blue-gray-900 dark:text-white">
                    <Typography
                        as="a"
                        href="/"
                        variant="h1"
                        className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-lwr-blue-color-500 text-2xl font-extrabold"
                    >
                        LEARN {<span className="text-lwr-orange-color-100">{'{W}'}</span>} RUSTAM
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <div className="hidden gap-2 lg:flex">
                        {
                            status === "loading" || status === "authenticated" ? (
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
                    <NavList />
                    <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                        {
                            status === "loading" || status === "authenticated" ? (
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
                    </div>
                </Collapse>
            </Navbar>
        </>
    );
}


const UserProfile = ({ user }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <a href="/profile"><img src={user.user?.image} width={30} style={{ borderRadius: 50 }} /></a>
        </div>
    )
}