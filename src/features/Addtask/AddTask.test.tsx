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
        render(<AddTask action={mockAction} />);
        expect(screen.getByLabelText(/create new task/i)).toBeInTheDocument();
        expect(screen.getByTestId('AddTask-button')).toBeInTheDocument();
    });

    test.each(['test placeholder'])('render with the provided placeholder', (text: string) => {
        render(<AddTask action={mockAction} placeholder={text} />);
        expect(screen.getByLabelText(new RegExp(text, 'i'))).toBeInTheDocument();
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

        const button = screen.getByTestId('AddTask-button');
        fireEvent.click(button);

        expect(button).toBeDisabled();
        expect(screen.getByText(/the field cannot be empty/i)).toBeInTheDocument();
    });

    test('should hide error message when is entered into input', () => {
        render(<AddTask action={mockAction} />);

        const input = screen.getByLabelText(/create new task/i);
        const button = screen.getByTestId('AddTask-button');

        fireEvent.click(button);
        fireEvent.change(input, { target: { value: taskName } });

        expect(button).not.toBeDisabled();
        expect(screen.queryByText(/the field cannot be empty/i)).not.toBeInTheDocument();
    });
});
