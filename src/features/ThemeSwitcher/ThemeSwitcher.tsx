import React, { FC, memo } from 'react';
import { FormControlLabel } from '@mui/material';
import { ThemeName, useTheme } from 'app/providers/AppThemeProvider';
import { MaterialUISwitch } from './ThemeSwitcher.style';

interface ThemeSwitcherProps {
    label?: string;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ label }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <FormControlLabel
            control={(
                <MaterialUISwitch
                    theme={theme}
                    checked={theme.palette.mode === ThemeName.DARK}
                />
            )}
            label={label}
            onClick={toggleTheme}
            data-testid={`ThemeSwitcher-mode-${theme.palette.mode}`}
        />
    );
});

export default ThemeSwitcher;
