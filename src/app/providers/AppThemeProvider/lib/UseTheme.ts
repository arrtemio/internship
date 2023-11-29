import { Theme } from '@mui/material';
import { useContext } from 'react';
import { themeChange, ThemeContext, ThemeName } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme?.palette.mode === ThemeName.DARK ? ThemeName.LIGHT : ThemeName.DARK;
        setTheme?.(themeChange(newTheme));

        localStorage.setItem('theme', newTheme);
    };
    return { theme: theme || themeChange(ThemeName.LIGHT), toggleTheme };
}
