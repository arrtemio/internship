import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { FormMessages } from 'shared/lib/messages';
import { componentRender } from 'shared/lib/tests';
import { testTask } from 'shared/test/TestTask';
import { AddSubTask } from './AddSubTask';

describe('AddSubTask component', () => {
    const renderedComponent = () => componentRender(<AddSubTask id={testTask.id} />, {
        initialState: { tasks: { data: [testTask], isLoading: false, error: undefined } },
    });

    const taskName = 'Test task';

    test('should render without errors', () => {
        renderedComponent();

        expect(screen.getByLabelText(/create sub task/i)).toBeInTheDocument();
        expect(screen.getByTestId(`AddSubTask-button-${testTask.id}`)).toBeInTheDocument();
    });

    test('should show an error message if the task name is empty when create button is clicked', async () => {
        renderedComponent();

        const button = screen.getByTestId(`AddSubTask-button-${testTask.id}`);
        fireEvent.click(button);

        await waitFor(() => {
            expect(button).toBeDisabled();
            expect(screen.getByText(FormMessages.EMPTY)).toBeInTheDocument();
        });
    });

    test('should hide error message when is entered into input', async () => {
        renderedComponent();

        const input = screen.getByLabelText(/create sub task/i);
        const button = screen.getByTestId(`AddSubTask-button-${testTask.id}`);

        await act(async () => {
            fireEvent.click(button);
            fireEvent.change(input, { target: { value: taskName } });

            await waitFor(() => {
                expect(button).not.toBeDisabled();
                expect(screen.queryByText(FormMessages.EMPTY)).not.toBeInTheDocument();
            });
        });
    });
});
