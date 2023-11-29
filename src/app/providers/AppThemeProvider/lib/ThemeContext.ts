import { createTheme, Theme } from '@mui/material';
import { createContext } from 'react';

export enum ThemeName {
    DARK = 'dark',
    LIGHT = 'light',
}
export const themeChange = (variant: ThemeName) => createTheme({
    palette: {
        mode: variant,
    },
});

export interface ThemeContextProps {
    theme?: Theme,
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
