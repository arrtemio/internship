import { generateRandomId } from './generateRandomID';

describe('generateRandomID', () => {
    test('should work without arguments', () => {
        expect(generateRandomId().length).toEqual(8);
    });
    test('should return string length = 10', () => {
        expect(generateRandomId(10).length).toEqual(10);
    });
});
