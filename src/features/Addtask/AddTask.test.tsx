import { fireEvent, render, screen } from '@testing-library/react';
import { AddTask } from './AddTask';

import '@testing-library/jest-dom/extend-expect';

describe('AddTask component', () => {
    const taskName = 'Test task';
    let mockAction: () => void;
    beforeEach(() => {
        mockAction = jest.fn();
    });

    test('should render without errors', () => {
        render(<AddTask action={() => {}} />);
    });

    test('should call action with correct task name when create button is clicked', () => {
        render(<AddTask action={mockAction} />);

        const input = screen.getByLabelText(/create new task/i);
        const button = screen.getByTestId('AddTask-button');

        fireEvent.change(input, { target: { value: taskName } });
        fireEvent.click(button);

        expect(mockAction).toHaveBeenCalledWith(taskName);
    });

    test('should show an error message if the task name is empty when create button is clicked', () => {
        render(<AddTask action={mockAction} />);

        const input = screen.getByLabelText(/create new task/i);
        const button = screen.getByTestId('AddTask-button');

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(button);

        expect(button).toBeDisabled();
        expect(screen.getByText(/the field cannot be empty/i)).toBeInTheDocument();

        fireEvent.change(input, { target: { value: taskName } });

        expect(button).not.toBeDisabled();
        expect(screen.queryByText(/the field cannot be empty/i)).not.toBeInTheDocument();
    });
});
