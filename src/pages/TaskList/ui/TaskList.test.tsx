import { generateRandomId, getDateAndTime } from 'shared/lib/helpers';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from 'app/store';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { testTask } from 'shared/test/TestTask';
import { Status } from 'entities/Task';
import { TaskList } from './TaskList';

jest.mock('shared/lib/helpers');

describe('TaskList test', () => {
    const initialState = {};

    beforeEach(() => {
        (generateRandomId as jest.Mock).mockImplementation(() => 'ghj43GF6');
        (getDateAndTime as jest.Mock).mockImplementation(() => '14.11.2023 / 15.53.23');
    });

    test('Task and sub task creation test', () => {
        render(
            <Provider store={setupStore(initialState)}>
                <TaskList />
            </Provider>,
        );

        const taskInput = (screen.getByLabelText(/create new task/i));
        expect(taskInput).toBeInTheDocument();

        fireEvent.input(taskInput, { target: { value: 'New task' } });
        fireEvent.click(screen.getByTestId('AddTask-button'));

        expect(generateRandomId).toHaveBeenCalled();
        expect(screen.getByText('Created:14.11.2023 / 15.53.23')).toBeInTheDocument();
        expect(screen.getByText('New task')).toBeInTheDocument();

        fireEvent.click(screen.getByText('New task'));

        const subTaskInput = screen.getByLabelText(/create sub task/i);
        expect(subTaskInput).toBeInTheDocument();

        fireEvent.input(subTaskInput, { target: { value: 'New_test_sub_task' } });
        fireEvent.click(screen.getByTestId('AddTask-button-ghj43GF6'));

        expect(generateRandomId).toHaveBeenCalled();
        expect(screen.getByText('New_test_sub_task')).toBeInTheDocument();
    });

    test('Create new sub task in complete task test', () => {
        localStorage.setItem('tasks', JSON.stringify([{ ...testTask, status: Status.COMPLETED, subTasks: [] }]));

        render(
            <Provider store={setupStore(initialState)}>
                <TaskList />
            </Provider>,
        );

        expect(screen.getAllByText('Completed')).toHaveLength(1);
        expect(screen.getByText('Click for more')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Click for more'));
        expect(screen.queryByText('Click for more')).not.toBeInTheDocument();
        expect(screen.getByLabelText(/create sub task/i)).toBeInTheDocument();

        fireEvent.input(screen.getByLabelText(/create sub task/i), { target: { value: 'New_test_sub_task' } });
        fireEvent.click(screen.getByTestId(`AddTask-button-${testTask.id}`));

        expect(generateRandomId).toHaveBeenCalled();
        expect(screen.getByText('New_test_sub_task')).toBeInTheDocument();

        expect(screen.queryAllByText('Completed')).toHaveLength(0);
        expect(screen.getAllByText('In progress')).toHaveLength(1);
    });
});
