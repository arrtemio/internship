import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests';
import { StateSchema } from 'app/store';
import { AddMainTask } from './AddMainTask';

import '@testing-library/jest-dom/extend-expect';

describe('AddMainTask', () => {
    const state: StateSchema = {
        tasks: {
            data: [],
            isLoading: false,
            error: undefined,
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
        expect(screen.getByTestId('AddMainTask-button')).toBeInTheDocument();
    });

    test('should show an error message if the performer email is not an email', () => {
        renderedComponent();

        fireEvent.change(screen.getByLabelText('Performer email'), { target: { value: 'asd' } });
        fireEvent.click(screen.getByTestId('AddMainTask-button'));

        expect(screen.getByText('Must be an email')).toBeInTheDocument();
        expect(screen.getByTestId('AddMainTask-button')).toBeDisabled();
    });

    test('should show an error message if the task name is empty', () => {
        renderedComponent();

        fireEvent.click(screen.getByTestId('AddMainTask-button'));

        expect(screen.getByText('Field cannot be empty')).toBeInTheDocument();
        expect(screen.getByTestId('AddMainTask-button')).toBeDisabled();
    });

    test('should hide error message when is entered into input', () => {
        renderedComponent();

        const taskName = screen.getByLabelText('Create new task');
        const performerEmail = screen.getByLabelText('Performer email');
        const button = screen.getByTestId('AddMainTask-button');

        fireEvent.change(performerEmail, { target: { value: 'asd' } });
        fireEvent.click(button);
        fireEvent.change(taskName, { target: { value: 'asd' } });
        fireEvent.change(performerEmail, { target: { value: '' } });

        expect(button).not.toBeDisabled();
        expect(screen.queryByText('Field cannot be empty')).not.toBeInTheDocument();
        expect(screen.queryByText('Must be an email')).not.toBeInTheDocument();
    });
});
