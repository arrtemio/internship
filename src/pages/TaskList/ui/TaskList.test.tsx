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
import { TaskList } from './TaskList';

const middlewares = [thunk.withExtraArgument({ firestore })];
const mockStore = configureStore(middlewares);

describe('TaskList', () => {
    it('renders the task list correctly', async () => {
        const initialState = {
            tasks: {
                data: [testTask],
                isLoading: false,
                error: undefined,
            },
        };
        type StoreType = {
            dispatch: ThunkDispatch<StoreType, void, AnyAction>;
        };

        const store: StoreType = mockStore(initialState);
        const renderTaskList = () => componentRender(<TaskList />, { initialState });

        jest.spyOn(store, 'dispatch').mockImplementationOnce(() => Promise.resolve());

        renderTaskList();

        await waitFor(() => {
            const title = screen.getByTestId('TaskCard-title');
            expect(title).toHaveTextContent(testTask.title);
        });
    });
});
