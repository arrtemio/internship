import {
    fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { componentRender } from 'shared/lib/tests';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { testTask } from 'shared/test/TestTask';
import { testUser } from 'shared/test/TestUser';
import { setupStore, StateSchema } from './store';
import App from './App';

describe('App test', () => {
    const state: StateSchema = {
        tasks: {
            data: [testTask],
            isLoading: false,
            error: undefined,
            messages: [],
        },
        user: {
            data: testUser,
            isAuth: true,
            isLoading: false,
        },
    };
    const emptyState: StateSchema = {
        tasks: {
            data: [],
            isLoading: false,
            error: undefined,
            messages: [],
        },
        user: {
            data: null,
            isAuth: false,
            isLoading: false,
        },
    };

    const renderedComponent = (state: StateSchema) => componentRender(<App />, { initialState: state });

    test('Should open tasks board page when user is auth', async () => {
        renderedComponent(state);

        await waitFor(() => {
            expect(screen.getByTestId('TaskBoard')).toBeInTheDocument();
        });
    });

    test('Should open unauthorized page when user is not auth', () => {
        renderedComponent(emptyState);

        expect(screen.getByTestId('Unauthorized')).toBeInTheDocument();
    });

    test('Should open statistics page when user click link', async () => {
        renderedComponent(state);

        fireEvent.click(screen.getByTestId('ToStatistics'));

        await waitFor(() => {
            expect(screen.getByTestId('Highcharts')).toBeInTheDocument();
        });
    });

    test('Should open Not-found page, when route is not exist', () => {
        render(
            <MemoryRouter initialEntries={['/non-existing-route']}>
                <Provider store={setupStore(state)}>
                    <App />
                </Provider>
            </MemoryRouter>,
        );

        expect(screen.getByTestId('Error404')).toBeInTheDocument();
    });
});
