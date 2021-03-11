const util = require('../bot/utils/util');

test('should fetch users', () => {
    const channelSuccess = {
        send: (m) => {
            expect(m).toBe('abc');
            return new Promise(((resolve) => {
                resolve('success');
            }));
        },
    };

    const channelFail = {
        send: (m) => {
            expect(m).toBe('myMessage');
            return new Promise(((resolve, reject) => {
                reject(new Error('error'));
            }));
        },
    };

    expect(() => util.sendMessage(channelSuccess, 'abc')).not.toThrow();
    expect(() => util.sendMessage(channelFail, 'myMessage')).not.toThrow();
});
