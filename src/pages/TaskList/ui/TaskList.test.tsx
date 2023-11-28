import { generateRandomId, getDateAndTime } from 'shared/lib/helpers';
import {
    render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from 'app/store';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { testTask } from 'shared/test/TestTask';
import { Status } from 'entities/Task';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { TaskList } from './TaskList';

jest.mock('shared/lib/helpers');

describe('TaskList test', () => {
    const renderTaskList = () => {
        render(
            <Provider store={setupStore({})}>
                <TaskList />
            </Provider>,
        );
    };
    const dateAndTime = '14.11.2023 / 15.53.23';

    beforeEach(() => {
        (generateRandomId as jest.Mock).mockImplementation(() => 'ghj43GF6');
        (getDateAndTime as jest.Mock).mockImplementation(() => dateAndTime);
    });

    test('Create task test', () => {
        renderTaskList();

        const taskInput = (screen.getByLabelText(/create new task/i));
        fireEvent.input(taskInput, { target: { value: 'New task' } });
        fireEvent.click(screen.getByTestId('AddTask-button'));

        expect(generateRandomId).toHaveBeenCalled();
        expect(screen.getByText(`Created:${dateAndTime}`)).toBeInTheDocument();
        expect(screen.getByText('New task')).toBeInTheDocument();
    });

    test('Create subtask test', () => {
        localStorage.setItem('tasks', JSON.stringify([{ ...testTask, subTasks: [] }]));
        renderTaskList();

        fireEvent.click(screen.getByText(testTask.title));

        const subTaskInput = screen.getByLabelText(/create sub task/i);
        fireEvent.input(subTaskInput, { target: { value: 'New_test_sub_task' } });
        fireEvent.click(screen.getByTestId(`AddTask-button-${testTask.id}`));

        expect(generateRandomId).toHaveBeenCalled();
        expect(screen.getByText('New_test_sub_task')).toBeInTheDocument();
    });

    test('Create new sub task, when task is completed', () => {
        localStorage.setItem('tasks', JSON.stringify([{ ...testTask, status: Status.COMPLETED, subTasks: [] }]));
        renderTaskList();

        fireEvent.click(screen.getByText('Click for more'));
        fireEvent.input(screen.getByLabelText(/create sub task/i), { target: { value: 'New_test_sub_task' } });
        fireEvent.click(screen.getByTestId(`AddTask-button-${testTask.id}`));

        expect(generateRandomId).toHaveBeenCalled();
        expect(screen.getByText('New_test_sub_task')).toBeInTheDocument();
        expect(screen.queryAllByText(Status.COMPLETED)).toHaveLength(0);
        expect(screen.getAllByText(Status.IN_PROGRESS)).toHaveLength(1);
    });

    test('Change task status to Completed. Task and subtask status should be Completed', async () => {
        localStorage.setItem('tasks', JSON.stringify([testTask]));
        renderTaskList();

        fireEvent.click(screen.getByText(testTask.title));
        act(() => {
            userEvent.click(screen.getByText(testTask.status));
        });
        act(() => {
            userEvent.click(screen.getByText(Status.COMPLETED));
        });

        await waitFor(() => {
            expect(screen.getAllByText(Status.COMPLETED)).toHaveLength(testTask.subTasks.length + 1);
        });
    });
});
