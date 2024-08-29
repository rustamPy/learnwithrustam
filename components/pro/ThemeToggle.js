'use client';
import { useState, useEffect, use } from 'react'
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Spinner } from "@material-tailwind/react";


export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [icon, setIcon] = useState(<Spinner color="amber" className="w-3 h-3 text-blue-500" />)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setIcon(theme === 'dark' ? <FaSun className="text-lwr-orange-color-100" /> : <FaMoon className="text-lwr-general-blue-light-theme-color-1" />)
    }, [])

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
            setIcon(<FaMoon className="text-lwr-general-blue-light-theme-color-1" />)
        } else {
            setTheme('dark')
            setIcon(<FaSun className="text-lwr-orange-color-100" />)
        }
        setLoading(true)
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded"
            aria-label="Toggle theme"
        >
            {icon}
        </button>
    );
}
