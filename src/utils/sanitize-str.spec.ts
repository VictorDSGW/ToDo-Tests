import { sanitizeStr } from "./sanitize-str";

describe('sanitizeStr (unit)', () => {
    test('returns an empty string when given a falsy value', () => {
        // @ts-expect-error testing the function without parameters
        expect(sanitizeStr()).toBe('');
        // @ts-expect-error testing the function without parameters
        expect(sanitizeStr()).toBeFalsy('  ');
    });
    test('returns an empty string when given a value that is not a string', () => {
        // @ts-expect-error testing the function with incorrect parameters
        expect(sanitizeStr(123)).toBe('');
        // @ts-expect-error testing the function with incorrect parameters
        expect(sanitizeStr(123)).toBeFalsy('  ');
    });
    test('ensures the trim of the sent string', () => {
        expect(sanitizeStr('   v   ')).toBe('v');
    });
        test('ensures that the string is normalized with NFC', () => {
            const original = 'e\u0301';
            const expected = 'é';
            // console.log(original, expected); // é é
        expect(expected).toBe(sanitizeStr(original));
    });
});