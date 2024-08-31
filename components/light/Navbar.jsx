'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FaStar } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";


const Navbar = () => {
    const pathname = usePathname();

    const goPro = () => {
        let updated = pathname.replace('/light', '')
        if (!updated) {
            updated = '/'
        }
        return updated
    }

    console.log(pathname)

    return (
        <>
            <nav className="bg-gray-200 p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <Link href="/light">L{`{W}`}R</Link>
                    </div>
                    <div className="flex flex-row">
                        <Link href="/light/leetcode" className="text-black px-3">Leetcode</Link>
                        <div className="px-3 flex flex-row items-center text-yellow-800">
                            <Link href={goPro()}>
                                Switch to Pro
                            </Link>
                            <FaStar className="ml-1" />
                        </div>
                        <div className="px-3 flex flex-row items-center text-blue-800">

                            <Link href={"/light/people"}>
                                GQ - Gentlemen's Quarterly
                            </Link>
                            <MdVerifiedUser className="ml-1" />
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar;