const source = require('rfr');

const { snowflakeValidator } = source('models/util');

describe('discord snowflake validator', () => {
    test('invalid object', () => {
        expect(snowflakeValidator({
            id: '788091112476770353',
        })).toBe(false);
    });

    test('invalid number', () => {
        expect(snowflakeValidator(788091112476770353)).toBe(false);
    });

    test('words', () => {
        expect(snowflakeValidator('this is not a valid id')).toBe(false);
    });

    test('too long', () => {
        expect(snowflakeValidator('788091112476770353788091112476770353')).toBe(false);
    });

    test('valid formats', () => {
        expect(snowflakeValidator('788091112476770353')).toBe(true);
        expect(snowflakeValidator('000000000000000000')).toBe(true);
        expect(snowflakeValidator('999999999999999999')).toBe(true);
        expect(snowflakeValidator('12345678901234567890')).toBe(true);
    });
});
