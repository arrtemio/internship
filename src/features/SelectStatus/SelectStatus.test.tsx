import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Status } from 'entities/Task';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { SelectStatus } from './SelectStatus';

describe('SelectStatus component', () => {
    test('render without errors', () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <SelectStatus value={Status.TO_DO} />
            </I18nextProvider>,
        );
        expect(screen.getByText(Status.TO_DO)).toBeInTheDocument();
    });

    test('open/close status select menu', async () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <SelectStatus value={Status.TO_DO} />
            </I18nextProvider>,
        );

        act(() => {
            userEvent.click(screen.getByText(Status.TO_DO));
        });
        // List of Select options
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        // Select option
        expect(screen.getByTestId('SelectStatus-item-Completed')).toBeInTheDocument();

        act(() => {
            userEvent.click(screen.getByTestId('SelectStatus-item-Completed'));
        });

        await waitFor(() => {
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });
    });
});
