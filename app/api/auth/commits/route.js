// /app/api/commits/route.js

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://api.github.com/repos/rustamPy/learnwithrustam/commits?sha=beta_0_3_1', {
            headers: {
                'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });



        if (!response.ok) throw new Error('Network response was not ok');

        const commits = await response.json();
        const latestCommit = commits[0];

        return NextResponse.json({
            sha: latestCommit.sha,
            message: latestCommit.commit.message,
            date: latestCommit.commit.author.date,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching commit data' }, { status: 500 });
    }
}
