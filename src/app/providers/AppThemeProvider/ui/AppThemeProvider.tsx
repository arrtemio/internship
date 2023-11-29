import {
    FC, PropsWithChildren, useMemo, useState,
} from 'react';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { themeChange, ThemeContext, ThemeName } from '../lib/ThemeContext';

const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const defaultTheme = localStorage.getItem('theme') === ThemeName.DARK
        ? themeChange(ThemeName.DARK)
        : themeChange(ThemeName.LIGHT);

    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default AppThemeProvider;
