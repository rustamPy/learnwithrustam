'use client';
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

const CGiscus = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);


    return (
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
            theme={theme}
            lang="en"
            loading="lazy"
        />
    );
}

export default CGiscus;
