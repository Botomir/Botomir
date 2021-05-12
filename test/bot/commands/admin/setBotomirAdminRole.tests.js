const source = require('rfr');

const { setBotomirAdminRole } = source('bot/commands/admin');

describe('test setBotomirAdminRole', () => {
    test('role does not exist', () => {
        const lookupRoleName = jest.fn();
        lookupRoleName.mockReturnValue(false);

        const sendMessage = jest.fn();
        const mockMessage = {
            channel: 'channel',
        };
        setBotomirAdminRole(mockMessage, 'fake-role');
        expect(sendMessage).toHaveBeenCalledWith([mockMessage.channel, 'Error: that role does not exist!']);
    });
});
