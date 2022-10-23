class CommandDoesNotExistError extends Error {
    constructor(command, ...args) {
        super(...args);
        this.name = 'CommandDoesNotExistError';
        if (!this.message) {
            this.message = `Command '${command}' does not exist`;
        }
    }
}

module.exports = {
    CommandDoesNotExistError,
};
