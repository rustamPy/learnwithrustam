'use client';
import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { FaInfoCircle } from "react-icons/fa";

const BannerSection = ({ isScrolled }) => {
    const [commitInfo, setCommitInfo] = useState(null);
    const [showBox, setShowBox] = useState(false);

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
            <div className={`absolute top-0 left-0 w-full bg-[#ff5500] text-white text-center py-1 text-sm font-semibold ${isScrolled && 'rounded-tl-xl rounded-tr-xl'}`}>
                <Typography variant="small" className="font-bold text-xs flex items-center justify-center">
                    🚀 Beta: {commitInfo && commitInfo.message} - {commitInfo && commitInfo.date} - {commitInfo && <span className="text-gray-900 ml-1"> <a href={`https://github.com/rustamPy/learnwithrustam/commit/${commitInfo.sha}`} target="blank">view the last changes </a> </span>}
                    <span className="relative inline-block ml-2">
                        <FaInfoCircle
                            className="cursor-pointer"
                            onMouseEnter={() => setShowBox(true)}
                            onMouseLeave={() => setShowBox(false)}
                        />
                        {showBox && (
                            <div className="absolute z-10 p-2 bg-white text-black rounded shadow-lg text-xs w-64 left-1/2 transform -translate-x-1/2">
                                Currently this website using Free tier of Mongo DB and may not be tolerant to heavy workload. Please use it with caution.
                            </div>
                        )}
                    </span>
                </Typography>
            </div>
        </>
    );
}

export default BannerSection;