import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import LangSwitcher from './LangSwitcher';

describe('LangSwitcher test', () => {
    test('Render without error', () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <LangSwitcher />
            </I18nextProvider>,
        );

        expect(screen.getByText('EN')).toBeInTheDocument();
    });

    test('Should change language', () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <LangSwitcher />
            </I18nextProvider>,
        );

        fireEvent.click(screen.getByText('EN'));

        expect(screen.getByText('PL')).toBeInTheDocument();
    });
});
