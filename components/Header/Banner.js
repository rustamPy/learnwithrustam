'use client';
import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function BannerSection() {
    const [showVersion, setShowVersion] = useState(true)

    return (
        <>
            {showVersion &&
                <section className="mx-auto bg-[#cb3c3c]">
                    <div className="shadow-4xl px-4 py-2 flex flex-wrap lg:items-center lg:justify-center justify-end gap-x-6">
                        <Typography variant="h6" color="white" className="text-md">
                            beta 0.3.7 - Updated Profile - Fixing dark theme - /Courses fix
                        </Typography>
                        <Button className="ml-auto" color="white" variant="text" onClick={() => setShowVersion(false)}>
                            <XMarkIcon className="text-white w-4 h-4 stroke-2" />
                        </Button>
                    </div>
                </section>
            }
        </>
    );
}

export default BannerSection;