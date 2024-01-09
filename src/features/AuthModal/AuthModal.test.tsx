import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests';
import { AuthModal } from './AuthModal';
import '@testing-library/jest-dom/extend-expect';

describe('AuthModal', () => {
    const renderComponent = () => componentRender(
        <AuthModal open onClose={() => {}} />,
        {},
    );

    test('should renders without error', () => {
        renderComponent();

        expect(screen.getByTestId('AuthModal-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('AuthModal-title')).toBeInTheDocument();
        expect(screen.getByTestId('AuthModal-caption-switch')).toBeInTheDocument();
        expect(screen.getByTestId('AuthModal-email')).toBeInTheDocument();
        expect(screen.getByTestId('AuthModal-pass')).toBeInTheDocument();
    });

    test('Switch from Login to Registration', () => {
        renderComponent();

        const title = screen.getByTestId('AuthModal-title');
        const captionSwitchLink = screen.getByTestId('AuthModal-caption-switch');

        expect(title).toHaveTextContent('Login');
        expect(captionSwitchLink).toHaveTextContent('Registration');

        fireEvent.click(screen.getByTestId('AuthModal-caption-switch'));

        expect(title).toHaveTextContent('Registration');
        expect(captionSwitchLink).toHaveTextContent('Login');
    });

    test('Empty email and password submit', async () => {
        renderComponent();

        fireEvent.click(screen.getByTestId('AuthModal-btn-login'));

        await waitFor(() => {
            expect(screen.getAllByText('Field cannot be empty')).toHaveLength(2);
        });
    });

    test('Incorrect email and password submit', async () => {
        renderComponent();

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'asd' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'asd' } });
        fireEvent.click(screen.getByTestId('AuthModal-btn-login'));

        await waitFor(() => {
            expect(screen.getByText('Must be an email')).toBeInTheDocument();
            expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
        });
    });
});
