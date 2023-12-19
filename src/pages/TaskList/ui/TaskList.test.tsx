import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testTask } from 'shared/test/TestTask';
import { firestore } from 'app/firebase';
import 'core-js';
import '@testing-library/jest-dom';
import { componentRender } from 'shared/lib/tests';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import * as dateAndTime from 'shared/lib/helpers/getDateAndTime/getDateAndTime';
import { getDateAndTime } from 'shared/lib/helpers';
import { StateSchema } from 'app/store';
import { testUser } from 'shared/test/TestUser';
import { TaskList } from './TaskList';

const middlewares = [thunk.withExtraArgument({ firestore })];
const mockStore = configureStore(middlewares);

describe('TaskList', () => {
    it('renders the task list correctly', async () => {
        const initialState: StateSchema = {
            tasks: {
                data: [testTask],
                isLoading: false,
                error: undefined,
            },
            user: {
                data: testUser,
                isAuth: true,
                isLoading: false,
            },
        };
        type StoreType = {
            dispatch: ThunkDispatch<StoreType, void, AnyAction>;
        };

        const store: StoreType = mockStore(initialState);
        const renderTaskList = () => componentRender(<TaskList />, { initialState });

        const dateAndTimeFn = jest.spyOn(dateAndTime, 'getDateAndTime');
        jest.spyOn(store, 'dispatch').mockImplementationOnce(() => Promise.resolve());

        renderTaskList();

        await waitFor(() => {
            const title = screen.getByTestId('TaskCard-title');
            const taskStatus = screen.getByTestId('SelectStatus-select');
            const taskDateAndTime = getDateAndTime(testTask.createdAt);

            expect(title).toHaveTextContent(testTask.title);
            expect(taskStatus).toHaveTextContent(testTask.status);
            expect(dateAndTimeFn).toHaveBeenCalledWith(testTask.createdAt);
            expect(screen.getByText(`Created:${taskDateAndTime}`)).toBeInTheDocument();
            expect(screen.getByText(`Total Sub Tasks:${testTask.subTasks.length}`)).toBeInTheDocument();
        });
    });
});
