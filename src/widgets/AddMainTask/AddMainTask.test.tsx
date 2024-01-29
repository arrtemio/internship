import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests';
import { StateSchema } from 'app/store';
import { act } from 'react-dom/test-utils';
import { FormMessages } from 'shared/lib/messages';
import { AddMainTask } from './AddMainTask';

import '@testing-library/jest-dom/extend-expect';

describe('AddMainTask', () => {
    const state: StateSchema = {
        tasks: {
            data: [],
            isLoading: false,
            error: undefined,
            messages: [],
        },
        user: {
            data: {
                email: 'test@test.com',
                token: '',
                id: '',
            },
            isAuth: true,
            isLoading: false,
            error: undefined,
        },
    };

    const renderedComponent = () => componentRender(<AddMainTask />, {
        initialState: state,
    });

    test('should render without errors', () => {
        renderedComponent();

        expect(screen.getByLabelText('Create new task')).toBeInTheDocument();
        expect(screen.getByLabelText('Performer email')).toBeInTheDocument();
        expect(screen.getByLabelText('Private')).toBeInTheDocument();
        expect(screen.getByLabelText('Important')).toBeInTheDocument();
        expect(screen.getByTestId('AddTask-button')).toBeInTheDocument();
    });

    test('should show an error message if the performer email is not an email', async () => {
        renderedComponent();

        fireEvent.change(screen.getByLabelText('Performer email'), { target: { value: 'asd' } });
        fireEvent.click(screen.getByTestId('AddTask-button'));

        await waitFor(() => {
            expect(screen.getByText(FormMessages.EMAIL)).toBeInTheDocument();
            expect(screen.getByTestId('AddTask-button')).toBeDisabled();
        });
    });

    test('should show an error message if the task name is empty', async () => {
        renderedComponent();

        fireEvent.click(screen.getByTestId('AddTask-button'));

        await waitFor(() => {
            expect(screen.getByText(FormMessages.EMPTY)).toBeInTheDocument();
            expect(screen.getByTestId('AddTask-button')).toBeDisabled();
        });
    });

    test('should hide error message when is entered into input', async () => {
        renderedComponent();

        const taskName = screen.getByLabelText('Create new task');
        const performerEmail = screen.getByLabelText('Performer email');
        const button = screen.getByTestId('AddTask-button');

        await act(async () => {
            fireEvent.change(performerEmail, { target: { value: 'asd' } });
            fireEvent.click(button);
            fireEvent.change(taskName, { target: { value: 'asd' } });
            fireEvent.change(performerEmail, { target: { value: '' } });

            await waitFor(() => {
                expect(button).not.toBeDisabled();
                expect(screen.queryByText(FormMessages.EMPTY)).not.toBeInTheDocument();
                expect(screen.queryByText(FormMessages.EMAIL)).not.toBeInTheDocument();
            });
        });
    });
});
