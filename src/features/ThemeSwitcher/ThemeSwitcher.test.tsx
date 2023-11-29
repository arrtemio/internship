import { fireEvent, render, screen } from '@testing-library/react';
import { AppThemeProvider, ThemeName } from 'app/providers/AppThemeProvider';
import ThemeSwitcher from './ThemeSwitcher';

import '@testing-library/jest-dom/extend-expect';

describe('ThemeSwitcher', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const renderSwitcher = (label?: string) => {
        render(
            <AppThemeProvider>
                <ThemeSwitcher label={label} />
            </AppThemeProvider>,
        );
    };

    test('Render with empty localstorage', () => {
        renderSwitcher();

        expect(screen.getByTestId('ThemeSwitcher-mode-light')).toBeInTheDocument();
    });

    test.each(['Test label'])('Render with label', (label: string) => {
        renderSwitcher(label);

        expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument();
    });

    test('Render with dark theme in localstorage', () => {
        localStorage.setItem('theme', ThemeName.DARK);
        renderSwitcher();

        expect(screen.getByTestId('ThemeSwitcher-mode-dark')).toBeInTheDocument();
    });

    test('Change theme', async () => {
        renderSwitcher();
        fireEvent.click(screen.getByTestId('ThemeSwitcher-mode-light'));

        expect(screen.getByTestId('ThemeSwitcher-mode-dark')).toBeInTheDocument();
    });
});
