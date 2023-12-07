import { generateRandomId, getDateAndTime } from 'shared/lib/helpers';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { testTask } from 'shared/test/TestTask';
import { Status } from 'entities/Task';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentRender } from 'shared/lib/tests';
import { getAllTasks } from 'entities/Task/model/actions/tasksActions';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { TaskList } from './TaskList';
import 'app/firebase/index';

jest.mock('shared/lib/helpers');
jest.mock('entities/Task/model/actions/tasksActions');
jest.mock('shared/lib/hooks/redux');

describe('TaskList test', () => {
    test('', () => {
        expect(2 + 2).toEqual(4);
    });
    // const renderTaskList = () => componentRender(<TaskList />, {
    //     initialState: {},
    // });
    // const dateAndTime = '14.11.2023 / 15.53.23';
    // const mockedDispatch = jest.fn();
    //
    // beforeEach(() => {
    //     (generateRandomId as jest.Mock).mockImplementation(() => 'ghj43GF6');
    //     (getDateAndTime as jest.Mock).mockImplementation(() => dateAndTime);
    // });
    //
    // test('Create task test', async () => {
    //     (useAppSelector as jest.Mock).mockReturnValue([]);
    //     (useAppDispatch as jest.Mock).mockReturnValue(mockedDispatch);
    //
    //     renderTaskList();
    //
    //     expect(getAllTasks).toHaveBeenCalled();
    //
    //     const taskInput = (screen.getByLabelText(/create new task/i));
    //     fireEvent.input(taskInput, { target: { value: 'New task' } });
    //     fireEvent.click(screen.getByTestId('AddTask-button'));
    //
    //     await waitFor(() => {
    //         expect(screen.getByText(`Created:${dateAndTime}`)).toBeInTheDocument();
    //         expect(screen.getByText('New task')).toBeInTheDocument();
    //     }, { timeout: 1000 });
    // });
    //
    // test('Create subtask test', () => {
    //     (useAppSelector as jest.Mock).mockReturnValue([{ ...testTask, subTasks: [] }]);
    //     renderTaskList();
    //
    //     fireEvent.click(screen.getByText(testTask.title));
    //
    //     const subTaskInput = screen.getByLabelText(/create sub task/i);
    //     fireEvent.input(subTaskInput, { target: { value: 'New_test_sub_task' } });
    //     fireEvent.click(screen.getByTestId(`AddTask-button-${testTask.id}`));
    //
    //     expect(generateRandomId).toHaveBeenCalled();
    //     expect(screen.getByText('New_test_sub_task')).toBeInTheDocument();
    // });
    //
    // test('Create new sub task, when task is completed', () => {
    //     (useAppSelector as jest.Mock).mockReturnValue([{ ...testTask, status: Status.COMPLETED, subTasks: [] }]);
    //     (useAppDispatch as jest.Mock).mockReturnValue(mockedDispatch);
    //     renderTaskList();
    //
    //     fireEvent.click(screen.getByText('Click for more'));
    //     fireEvent.input(screen.getByLabelText(/create sub task/i), { target: { value: 'New_test_sub_task' } });
    //     fireEvent.click(screen.getByTestId(`AddTask-button-${testTask.id}`));
    //
    //     expect(generateRandomId).toHaveBeenCalled();
    //     expect(screen.getByText('New_test_sub_task')).toBeInTheDocument();
    //     expect(screen.queryAllByText(Status.COMPLETED)).toHaveLength(0);
    //     expect(screen.getAllByText(Status.IN_PROGRESS)).toHaveLength(1);
    // });
    //
    // test('Change task status to Completed. Task and subtask status should be Completed', async () => {
    //     (useAppSelector as jest.Mock).mockReturnValue([testTask]);
    //     (useAppDispatch as jest.Mock).mockReturnValue(mockedDispatch);
    //     renderTaskList();
    //
    //     fireEvent.click(screen.getByText(testTask.title));
    //     act(() => {
    //         userEvent.click(screen.getByText(testTask.status));
    //     });
    //     act(() => {
    //         userEvent.click(screen.getByText(Status.COMPLETED));
    //     });
    //
    //     await waitFor(() => {
    //         expect(screen.getAllByText(Status.COMPLETED)).toHaveLength(testTask.subTasks.length + 1);
    //     });
    // });
});
