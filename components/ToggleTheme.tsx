'use client';
import { FaMoon, FaSun } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.documentElement.style.colorScheme = 'dark';
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = 'light';
            }
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <span onClick={toggleTheme} className="p-2 rounded">
            {theme === 'light' ? <FaMoon className="text-lwr-dark-blue dark:text-white" /> : <FaSun className="text-lwr-dark-blue dark:text-white" />}
        </span>
    );
};

export default ThemeToggle;
