import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { testTask } from 'shared/test/TestTask';
import { getDateAndTime } from 'shared/lib/helpers';
import '@testing-library/jest-dom/extend-expect';
import { componentRender } from 'shared/lib/tests';
import { MainTask } from './MainTask';

jest.mock('shared/lib/helpers');

describe('MainTask test', () => {
    const renderMainTask = () => componentRender(<MainTask task={testTask} />, {
        initialState: {
            tasks: {
                data: [testTask], isLoading: false, error: undefined, messages: [],
            },
        },
    });

    beforeEach(() => {
        (getDateAndTime as jest.Mock).mockImplementation(() => '14.11.2023 / 15.53.23');
    });

    test('Render task', () => {
        renderMainTask();

        expect(screen.getByText(testTask.title)).toBeInTheDocument();
        expect(screen.getByText(testTask.status)).toBeInTheDocument();
        expect(screen.getByText('Created:14.11.2023 / 15.53.23')).toBeInTheDocument();
    });

    test('Subtask render', () => {
        renderMainTask();

        fireEvent.click(screen.getByText(testTask.title));

        expect(screen.getByTestId('MainTask-details')).toBeInTheDocument();
        expect(screen.getByText(testTask.subTasks[0].title)).toBeInTheDocument();
        expect(screen.getByText(testTask.subTasks[0].status)).toBeInTheDocument();
    });

    test('expands and collapses the accordion when clicked', async () => {
        renderMainTask();

        const taskTitle = screen.getByTestId('TaskCard-title');
        fireEvent.click(taskTitle);

        const details = screen.getByTestId('MainTask-details');
        expect(details).toBeInTheDocument();

        fireEvent.click(taskTitle);

        await waitFor(() => {
            expect(details).not.toBeInTheDocument();
        });
    });
});
