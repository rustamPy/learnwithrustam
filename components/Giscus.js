'use client';
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';


const CGiscus = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className='mt-16 w-full'>
        <Giscus
            id="comments"
            repo="rustamPy/learnwithrustam"
            repoId="R_kgDOL8nujg"
            category="General"
            categoryId="DIC_kwDOL8nujs4Ch5W3"
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="0"
            emitMetadata="1"
            inputPosition="top"
                theme={theme === 'dark' ? 'dark' : 'light'}
            lang="en"
            loading="lazy"
        />
        </div>
    );
}

export default CGiscus;
