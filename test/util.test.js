const util = require('../bot/utils/util');


describe('test sendmessage', () => {

    test('underlying channel.send resolves', async () => {
        const channelSuccess = {
            send: (m) => {
                expect(m).toBe('abc');
                return new Promise(((resolve) => {
                    resolve('success');
                }));
            },
        };

        await expect(util.sendMessage(channelSuccess, 'abc')).resolves;
    });

    test('underlying channel.send rejects', async () => {
        const channelFail = {
            send: (m) => {
                expect(m).toBe('myMessage');
                return new Promise(((resolve, reject) => {
                    reject(new Error('error'));
                }));
            },
        };

        await expect(util.sendMessage(channelFail, 'myMessage')).resolves;
    });
});
