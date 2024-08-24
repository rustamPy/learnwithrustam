'use client';
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

const CGiscus = () => {
    // Initialize theme state based on localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        // Update the theme in localStorage whenever the theme state changes
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    useEffect(() => {
        // Optionally handle any other side effects related to theme change here
        console.log(`Current theme is ${theme}`);
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
