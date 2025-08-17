// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
    // Initialize state from localStorage or default to 'light'
    const [theme, setThemeState] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme : 'light';
        } catch (error) {
            // If localStorage is unavailable (e.g., SSR, private browsing)
            return 'light';
        }
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old theme class
        const prevTheme = theme === 'dark' ? 'light' : 'dark';
        root.classList.remove(prevTheme);

        // Add new theme class
        root.classList.add(theme);

        // Save the theme to localStorage
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.error("Failed to save theme to localStorage", error);
        }

    }, [theme]);

    const setTheme = (newTheme) => {
        setThemeState(newTheme);
    };

    return [theme, setTheme];
};