![Node.js CI testing](https://github.com/SoorajModi/Discord-Bot/workflows/testing/badge.svg)
![Node.js CI linter](https://github.com/SoorajModi/Discord-Bot/workflows/linter/badge.svg)
![David](https://img.shields.io/david/SoorajModi/Discord-Bot?style=plastic)
![David](https://img.shields.io/david/dev/SoorajModi/Discord-Bot?style=plastic)
![Lines of code](https://img.shields.io/tokei/lines/github/SoorajModi/Discord-Bot?style=plastic)
![GitHub](https://img.shields.io/github/license/SoorajModi/Discord-Bot?style=plastic)

# Discord-Bot

This is a template bot for a Discord Bot written in Node.js

## How to run

Install node modules `npm install`

Copy the `template.env` file to `.env`, and set all of the values for those fields.

Run locally using `node app.js`

### needed permissions
- manage server
- change nickname
- manage nicknames
- view channels
- send Messages
- embedded Links
- read message history

In order to use any of the bot configuration commands you must have the role `botmir-admin` assigned to you.

## Features

#### Commands
- Use `command-prompt` + `help` to view all commands.
- To add a new command you add the command to `lib/commands/botCommands.js` and a corresponding module.

#### Reactions
- To add roles for specific emojis you can specify them in the `config.json` file.
- You can add functionality for reactions to specified messages under `lib/reactions/botReactions.js` and a corresponding module.

#### Backup Messages
- Each message will be written to MongoDB. Data includes guild, channel, author, content, timestamp, and message id.
- Each Spotify track that is sent to the `DISCORD_MUSIC_CHANNEL_ID` will be stored in the database.
- An authenticate token database will also be maintained for Spotify access tokens.
- You can specify a different schema or database under `lib/database`.

#### Deployment
- This app is deployed to the free tier of Heroku. Kept awake using Kaffeine.

#### Configurations
- There are additional configurations that can be specified in the `config.json` file.
- You can specify a string for the command prompt.
- For the weather command, you can specify a default city and temperature unit.
- You can specify the Spotify playlist name (the date will get added to the end still) and the playlist description text.
- You can add privileged roles for which the bot cannot add/remove.

### Role permissions
Requires following role permissions
- Manage server
- Manage roles
- Manage channels
- Send messages
- Manage messages
- Embed Links
- Attach files
- Read message history
- Add reactions

## Contact

If you have any questions/requests please feel free to create a new issue.
