import React from 'react';
import { render, screen } from '@testing-library/react';
import { Status } from 'entities/Task';
import { SelectStatus } from './SelectStatus';
import '@testing-library/jest-dom/extend-expect';

describe('SelectStatus component', () => {
    test('render without errors', () => {
        render(<SelectStatus value={Status.TO_DO} />);
        expect(screen.getByText('To do')).toBeInTheDocument();
    });
});
