'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FaStar } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import React, { useState } from 'react';
import PeopleDrawer from './PeopleDrawer'
import {
    Navbar,
    Collapse,
    IconButton,
    Button
} from '@material-tailwind/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const NavBar = () => {
    const pathname = usePathname();
    const [openNav, setOpenNav] = useState(false)

    const [openDrawer, setOpenDrawer] = useState(false)

    const goPro = () => {
        let updated = pathname.replace('/light', '')
        if (!updated) {
            updated = '/'
        }
        return updated
    }

    return (
        <>
            <Navbar variant="gradient" className={`bg-gray-100 border-0 sticky mx-auto z-50 text-black top-0 w-full mx-auto rounded-xl px-2 py-2`}>
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/light" className="ml-4">L{`{W}`}R</Link>
                    <div className="hidden lg:block">
                        <div className="mb-6 p-0 flex lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
                            <Link href="/light/leetcode" className="text-black px-3">Leetcode</Link>
                            <div className="px-3 flex flex-row items-center text-yellow-800">
                                <Link href={goPro()}>
                                    Switch to Pro
                                </Link>
                                <FaStar className="ml-1" />
                            </div>
                            <div className="px-3 flex flex-row items-center text-blue-800">

                                <Button className="p-2 text-[8px]" color="blue" onClick={() => setOpenDrawer(true)}>
                                    GQ - Gentlemen's Quarterly 
                                </Button>
                            </div>
                        </div>
                    </div>

                    <IconButton
                        variant="text"
                        className="lg:hidden "
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
                    <Link href="/light/leetcode" className="text-black px-3">Leetcode</Link>
                    <div className="px-3 flex flex-row items-left text-yellow-800">
                        <Link href={goPro()}>
                            Switch to Pro
                        </Link>
                        <FaStar className="ml-1" />
                    </div>
                    <div className="px-3 flex flex-row items-center text-blue-800">

                        <Button className="p-2 text-[8px]" color="blue" onClick={() => setOpenDrawer(true)}>
                            GQ - Gentlemen's Quarterly
                        </Button>
                        <MdVerifiedUser className="ml-1" />
                    </div>
                </Collapse>
            </Navbar>
            <PeopleDrawer open={openDrawer} setOpen={setOpenDrawer} />
        </>

    )
}

export default NavBar;