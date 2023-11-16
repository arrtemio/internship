import { getDateAndTime } from './getDateAndTime';

describe('getDateAndTime', () => {
    test('with time', () => {
        expect(getDateAndTime(1699860692936))
            .toEqual('13.11.2023 / 10:31:32');
    });
    test('with null', () => {
        expect(getDateAndTime(null)).toEqual(null);
    });
});
