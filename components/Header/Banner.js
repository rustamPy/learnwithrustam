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
                    <div className="mb-4 shadow-sm px-4 py-2 flex bg-gray-900 flex-wrap lg:items-center lg:justify-center justify-end gap-x-6">
                        <Typography variant="h6" color="white" className="text-md">
                            Welcome, {session.user?.name}
                        </Typography>
                        <Button color="white" size="sm">
                            <a href="https://learnwithrustam.com" target="blank">check out the old one</a>
                        </Button>
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