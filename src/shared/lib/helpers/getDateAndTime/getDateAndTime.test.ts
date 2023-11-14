import { getDateAndTime } from './getDateAndTime';

describe('getDateAndTime', () => {
    test('with time', () => {
        expect(getDateAndTime(1699860692936))
            .toEqual({ date: '13.11.2023', time: '10:31:32' });
    });
    test('with null', () => {
        expect(getDateAndTime(null)).toEqual(null);
    });
});
