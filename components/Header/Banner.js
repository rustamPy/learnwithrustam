'use client';
import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";


const BannerSection = () => {

    const [commitInfo, setCommitInfo] = useState(null);

    useEffect(() => {


        const getCommitInfo = async () => {
            try {
                const response = await fetch('/api/auth/commits');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCommitInfo(data);
            } catch (error) {
                console.error('Error fetching commit data:', error);
                return null;
            }
        };
        getCommitInfo();
    }, []);

    return (
        <>

            <div className="absolute top-0 left-0 w-full bg-[#ff5500] rounded-tl-xl rounded-tr-xl text-white text-center py-1 text-sm font-semibold">
                <Typography variant="small" className="font-bold text-xs">
                    🚀 Beta: {commitInfo && commitInfo.message} - {commitInfo && commitInfo.date} - {commitInfo && <span className="text-gray-900"> <a href={`https://github.com/rustamPy/learnwithrustam/commit/${commitInfo.sha}`} target="blank">   view the last changes </a> </span>}
                </Typography>
            </div>
        </>

    );
}

export default BannerSection;