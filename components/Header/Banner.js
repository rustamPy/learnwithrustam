'use client';
import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";

const fetchLatestCommit = async () => {
    try {
        const response = await fetch('https://api.github.com/repos/rustamPy/learnwithrustam/commits?sha=beta_0_3_1', {
            headers: {
                'Authorization': `token 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`, // Optional: Use this if needed
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const commits = await response.json();
        const latestCommit = commits[0]; // Get the latest commit
        return {
            sha: latestCommit.sha,
            message: latestCommit.commit.message,
            date: latestCommit.commit.author.date,
        };
    } catch (error) {
        console.error('Error fetching commit data:', error);
        return null;
    }
};

const BannerSection = () => {

    const [commitInfo, setCommitInfo] = useState(null);

    useEffect(() => {
        const getCommitInfo = async () => {
            const info = await fetchLatestCommit();
            console.log(info.date)
            setCommitInfo(info);
        };
        getCommitInfo();
    }, []);

    console.log(commitInfo)
    return (
        <>

            <div className="absolute top-0 left-0 w-full bg-[#ff5500] rounded-tl-xl rounded-tr-xl text-white text-center py-1 text-sm font-semibold">
                <Typography variant="small" className="font-bold text-xs">
                    🚀 Beta: {commitInfo && commitInfo.message} - {commitInfo && commitInfo.date} - {commitInfo && <span className="text-gray-900"> <a href={`https://github.com/rustamPy/learnwithrustam/commit/${commitInfo.sha}`}>   view this commit </a> </span>}
                </Typography>
            </div>
        </>

    );
}

export default BannerSection;