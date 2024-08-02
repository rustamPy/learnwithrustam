'use client';
import React, { useState } from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export function BannerSection() {
    const [show, setShow] = useState(true);
    const { data: session } = useSession();

    return (
        <>
            {show && session &&
                <section className="mx-auto dark:bg-lwr-light-grey">
                    <div className="bg-gradient-to-r from-black via-lwr-orange-100 to-black mb-4 shadow-4xl px-4 py-2 flex flex-wrap lg:items-center lg:justify-center justify-end gap-x-6">
                        <Typography variant="h6" color="white" className="text-md">
                            Welcome, {session.user?.name}
                        </Typography>
                        <IconButton color="white" variant="text" onClick={() => setShow(false)}>
                            <XMarkIcon className="text-white w-4 h-4 stroke-2" />
                        </IconButton>
                    </div>
                </section>
            }
        </>
    );
}

export default BannerSection;