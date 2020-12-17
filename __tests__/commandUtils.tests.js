const rewire = require("rewire");

const commandUtilities = rewire("../lib/commands/commandUtilities");


test('commandUtilities.discardCommand', () => {

    expect(commandUtilities.discardCommand("!test")).toBe('');
    expect(commandUtilities.discardCommand("!test waffle")).toBe('waffle');
    expect(commandUtilities.discardCommand("!test          cats   ")).toBe('cats');
    expect(commandUtilities.discardCommand("!test          cats   dogs")).toBe('cats   dogs');
});

test('commandUtilities.splitStringBySpace', () => {

    expect(commandUtilities.splitStringBySpace("!test")).toEqual(['!test']);
    expect(commandUtilities.splitStringBySpace("!test waffle")).toEqual(['!test', 'waffle']);
    expect(commandUtilities.splitStringBySpace("!test          cats   ")).toEqual(['!test', 'cats']);
    expect(commandUtilities.splitStringBySpace("!test          cats   dogs")).toEqual(['!test', 'cats', 'dogs']);
});

test('commandUtilities.trimDiscordID', () => {

    let trimDiscordID = commandUtilities.__get__('trimDiscordID');
    expect(trimDiscordID("<@!356956593293754368>")).toBe('356956593293754368');     // with nickname
    expect(trimDiscordID("<@356984848574971914>")).toBe('356984848574971914');      // without nickname
    expect(trimDiscordID("<#788091112476770356>")).toBe('788091112476770356');      // channel id
    expect(trimDiscordID("<@&134362454976102401>")).toBe('134362454976102401');      // role id
    expect(trimDiscordID("false")).toBe(undefined);      //invalid
    expect(trimDiscordID("")).toBe(undefined);      //invalid
});

test('commandUtilities.filterRole', () => {

    let validRole = { name: "test", editable: true };
    let invalidRole1 = { name: "test", editable: false };
    let invalidRole2 = { name: "admin", editable: false };
    let invalidRole3 = { name: "admin", editable: true };
    let invalidRole4 = null;

    expect(commandUtilities.filterRole(validRole)).toEqual(validRole);
    expect(commandUtilities.filterRole(invalidRole1)).toEqual(null);
    expect(commandUtilities.filterRole(invalidRole2)).toEqual(null);
    expect(commandUtilities.filterRole(invalidRole3)).toEqual(null);
    expect(commandUtilities.filterRole(invalidRole4)).toEqual(null);
});
