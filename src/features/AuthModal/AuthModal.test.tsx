import { fireEvent, screen } from '@testing-library/react';
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

        const wrapper = screen.getByTestId('AuthModal-wrapper');
        const title = screen.getByTestId('AuthModal-title');
        const switchBtn = screen.getByTestId('AuthModal-caption-switch');
        const emailField = screen.getByTestId('AuthModal-email');
        const passField = screen.getByTestId('AuthModal-pass');

        expect(wrapper).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(switchBtn).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passField).toBeInTheDocument();
    });

    test('Switch from Login to Registration', () => {
        renderComponent();

        const title = screen.getByTestId('AuthModal-title');
        const switchBtn = screen.getByTestId('AuthModal-caption-switch');
        const captionSwitchLink = screen.getByTestId('AuthModal-caption-switch');

        expect(title).toHaveTextContent('Login');
        expect(captionSwitchLink).toHaveTextContent('Registration');

        fireEvent.click(switchBtn);

        expect(title).toHaveTextContent('Registration');
        expect(captionSwitchLink).toHaveTextContent('Login');
    });

    test('Empty email and password submit', () => {
        renderComponent();

        const submitBtn = screen.getByTestId('AuthModal-btn-login');

        fireEvent.click(submitBtn);

        expect(screen.getAllByText('Field cannot be empty')).toHaveLength(2);
    });

    test('Incorrect email and password submit', () => {
        renderComponent();

        const emailField = screen.getByLabelText('Email');
        const passField = screen.getByLabelText('Password');
        const submitBtn = screen.getByTestId('AuthModal-btn-login');

        fireEvent.change(emailField, { target: { value: 'asd' } });
        fireEvent.change(passField, { target: { value: 'asd' } });
        fireEvent.click(submitBtn);

        expect(screen.getByText('Must be an email')).toBeInTheDocument();
        expect(screen.getByText('Password must be more than 6 characters')).toBeInTheDocument();
    });
});
