import React from 'react';
import {
    render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { testTask } from 'shared/test/TestTask';
import { setupStore } from 'app/store';
import { Provider } from 'react-redux';
import { getDateAndTime } from 'shared/lib/helpers';
import { MainTask } from './MainTask';

import '@testing-library/jest-dom/extend-expect';

jest.mock('shared/lib/helpers');

const state = { tasks: { data: [{ ...testTask }] } };

test('expands and collapses the accordion when clicked', async () => {
    (getDateAndTime as jest.Mock).mockImplementation(() => '14.11.2023 / 15.53.23');
    render(
        <Provider store={setupStore(state)}>
            <MainTask task={testTask} />
        </Provider>,
    );

    const taskTitle = screen.getByTestId('TaskCard-title');
    expect(taskTitle).toBeInTheDocument();
    expect(screen.getByText('Created:14.11.2023 / 15.53.23')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('TaskCard-title'));

    const details = screen.getByTestId('MainTask-details');
    expect(details).toBeInTheDocument();
    expect(screen.getByText('test subtask 1')).toBeInTheDocument();

    fireEvent.click(taskTitle);

    await waitFor(() => {
        expect(details).not.toBeInTheDocument();
        expect(screen.queryByText('test subtask 1')).not.toBeInTheDocument();
    });
});
