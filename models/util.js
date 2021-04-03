

// check that the id is a string, < 20 digits, and is only made of numbers
function snowflakeValidator(id) {
    return typeof id === 'string' && id.length < 20 && /^[0-9]+$/.test(id);
}


module.exports = {
    snowflakeValidator
}
