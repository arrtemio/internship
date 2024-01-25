import { getDateAndTime } from './getDateAndTime';

describe('getDateAndTime', () => {
    test('with time', () => {
        expect(getDateAndTime(1699860692936))
            .toMatch(/^\d{2}\.\d{2}\.\d{4} \/ \d{2}:\d{2}:\d{2}$/);
    });
    test('with null', () => {
        expect(getDateAndTime(null)).toEqual('');
    });
});
