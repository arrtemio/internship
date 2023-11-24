import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Status } from 'entities/Task';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { SelectStatus } from './SelectStatus';

describe('SelectStatus component', () => {
    test('render without errors', () => {
        render(<SelectStatus value={Status.TO_DO} />);
        expect(screen.getByText(Status.TO_DO)).toBeInTheDocument();
    });

    test('open/close status select menu', async () => {
        render(<SelectStatus value={Status.TO_DO} />);
        expect(screen.getByText(Status.TO_DO)).toBeInTheDocument();
        act(() => {
            userEvent.click(screen.getByText(Status.TO_DO));
        });
        expect(screen.queryByText(Status.COMPLETED)).toBeInTheDocument();

        act(() => { userEvent.click(screen.getByText(Status.COMPLETED)); });

        await waitFor(() => {
            expect(screen.queryByText(Status.IN_PROGRESS)).not.toBeInTheDocument();
        });
    });
});
