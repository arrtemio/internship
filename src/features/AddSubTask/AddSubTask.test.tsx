import {
    fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { act } from 'react-dom/test-utils';
import { AddSubTask } from './AddSubTask';

describe('AddSubTask component', () => {
    const taskName = 'Test task';
    let mockAction: () => void;
    beforeEach(() => {
        mockAction = jest.fn();
    });

    test('should render without errors', () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <AddSubTask action={mockAction} />
            </I18nextProvider>,
        );
        expect(screen.getByLabelText(/create sub task/i)).toBeInTheDocument();
        expect(screen.getByTestId('AddSubTask-button')).toBeInTheDocument();
    });

    test('should call action with correct task name when create button is clicked', async () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <AddSubTask action={mockAction} />
            </I18nextProvider>,
        );

        const input = screen.getByLabelText(/create sub task/i);
        const button = screen.getByTestId('AddSubTask-button');

        fireEvent.change(input, { target: { value: taskName } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(mockAction).toHaveBeenCalledWith(taskName);
        });
    });

    test('should show an error message if the task name is empty when create button is clicked', async () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <AddSubTask action={mockAction} />
            </I18nextProvider>,
        );

        const button = screen.getByTestId('AddSubTask-button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(button).toBeDisabled();
            expect(screen.getByText(/field cannot be empty/i)).toBeInTheDocument();
        });
    });

    test('should hide error message when is entered into input', async () => {
        render(
            <I18nextProvider i18n={i18nForTests}>
                <AddSubTask action={mockAction} />
            </I18nextProvider>,
        );

        const input = screen.getByLabelText(/create sub task/i);
        const button = screen.getByTestId('AddSubTask-button');

        await act(async () => {
            fireEvent.click(button);
            fireEvent.change(input, { target: { value: taskName } });

            await waitFor(() => {
                expect(button).not.toBeDisabled();
                expect(screen.queryByText(/field cannot be empty/i)).not.toBeInTheDocument();
            });
        });
    });
});
