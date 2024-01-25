import { screen, fireEvent, waitFor } from '@testing-library/react';
import { StateSchema } from 'app/store';
import { testTask } from 'shared/test/TestTask';
import { testUser } from 'shared/test/TestUser';
import { componentRender } from 'shared/lib/tests';
import * as dateAndTime from 'shared/lib/helpers/getDateAndTime/getDateAndTime';
import { getDateAndTime } from 'shared/lib/helpers';
import { TaskBoard } from './TaskBoard';

import '@testing-library/jest-dom/extend-expect';

describe('TaskBoard', () => {
    const initialState: StateSchema = {
        tasks: {
            data: [testTask],
            isLoading: false,
            error: undefined,
        },
        user: {
            data: { ...testUser, email: '' },
            isLoading: false,
            error: undefined,
            isAuth: true,
        },
    };
    const renderedComponent = () => componentRender(<TaskBoard />, { initialState });

    test('renders the task board correctly when the user is logged in', async () => {
        const dateAndTimeFn = jest.spyOn(dateAndTime, 'getDateAndTime');

        renderedComponent();

        await waitFor(() => {
            const taskDateAndTime = getDateAndTime(testTask.createdAt);

            expect(screen.getByTestId(`BoardCard-${testTask.id}`)).toBeInTheDocument();
            expect(dateAndTimeFn).toHaveBeenCalledWith(testTask.createdAt);
            expect(screen.getByText(`Created:${taskDateAndTime}`)).toBeInTheDocument();
            expect(screen.getByTestId('BoardCard-Btn')).toBeInTheDocument();
        });
    });

    test('open modal and render Main Task, after the button has been pressed', async () => {
        renderedComponent();

        expect(screen.queryByTestId('MainTask')).not.toBeInTheDocument();

        await waitFor(() => {
            const openBnt = screen.getByTestId('BoardCard-Btn');

            fireEvent.click(openBnt);

            expect(screen.getByTestId('MainTask')).toBeInTheDocument();
        });
    });
});
