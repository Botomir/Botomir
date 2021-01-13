const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const keebMessage = 'Here is some information about mechanical keyboards for beginners:\n'
    + 'What is a mechanical keyboard: a mechanical keyboard is a keyboard built with high quality, typically spring activated, key switches. These key switches vary based on the keyboard’s application or user preference.\n'
    + 'About cases: https://switchandclick.com/2020/01/23/guide-to-mechanical-keyboard-cases/\n'
    + 'About plates: https://keyboard.university/200-courses/plate-materials-sizes\n'
    + 'About switches: https://dygma.com/blogs/stories/the-ultimate-guide-to-mechanical-keyboard-switches-for-2019\n'
    + 'Keycap materials: https://keyboardkings.com/comparing-pbt-keycaps-vs-abs-keycaps/\n'
    + 'Keyboard sizes: https://keyboard.university/100-courses/keyboard-sizes-layouts\n'
    + 'What is a group buy: https://keyboard.university/100-courses/group-buy\n'
    + 'Keycaplender: https://keycaplendar.firebaseapp.com/\n'
    + 'Major vendors:\n'
    + '\t-> https://kbdfans.com/\n'
    + '\t-> https://mechanicalkeyboards.com/\n'
    + '\t-> https://www.deskhero.ca/\n'
    + '\t-> https://www.apexkeyboards.ca/\n'
    + '\t-> https://www.ashkeebs.com/\n'
    + 'Feel free to poke #keebs if you have any questions!!';

function keebCommand(message) {
    sendMessage(message.channel, keebMessage);
}

exports.keebCommand = keebCommand;
