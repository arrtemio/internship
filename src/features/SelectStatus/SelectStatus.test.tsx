import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { Status } from 'entities/Task';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { componentRender } from 'shared/lib/tests';
import { testTask } from 'shared/test/TestTask';
import { StateSchema } from 'app/store';
import { SelectStatus } from './SelectStatus';

describe('SelectStatus component', () => {
    const state: StateSchema = {
        tasks: {
            data: [testTask],
            isLoading: false,
            error: undefined,
        },
        user: {
            data: {
                email: 'qwerty@mail.com',
                token: '',
                id: '',
            },
            isLoading: false,
            isAuth: true,
            error: undefined,
        },
    };
    const wrongEmailState: StateSchema = {
        tasks: {
            data: [],
            isLoading: false,
            error: undefined,
        },
        user: {
            data: {
                email: 'qwerty123@mail.com',
                token: '',
                id: '',
            },
            isLoading: false,
            error: undefined,
            isAuth: true,
        },
    };
    const renderedComponent = (state: StateSchema) => componentRender(
        <SelectStatus value={Status.TO_DO} taskPerformer="qwerty@mail.com" />,
        {
            initialState: state,
        },
    );
    test('render without errors', () => {
        renderedComponent(state);
        expect(screen.getByText(Status.TO_DO)).toBeInTheDocument();
    });

    test('open/close status select menu', async () => {
        renderedComponent(state);

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

    test('status select menu should not appear', () => {
        renderedComponent(wrongEmailState);

        act(() => {
            userEvent.click(screen.getByText(Status.TO_DO));
        });

        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
});
