
const util = require("../lib/utils/util");

test('should fetch users', () => {

    const channelSuccess = {
        send: (m) => {
            expect(m).toBe('abc');
            return new  Promise(function(resolve, reject) {
                resolve('success');
            });
        }
    };

    const channelFail= {
        send: (m) => {
            expect(m).toBe('myMessage');
            return new  Promise(function(resolve, reject) {
                reject('error');
            });
        }
    };

    expect(() => util.sendMessage(channelSuccess, 'abc')).not.toThrow();
    expect(() => util.sendMessage(channelFail, 'myMessage')).not.toThrow();
});
