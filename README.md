# Discord-Bot

This is a template bot for a Discord Bot written in Node.js

## How to run

Install node modules `npm install`

Run locally using `nodemon app.js`

## Features

#### Commands
- Use `command-prompt` + `help` to view all commands.
- To add a new command you add the command to `lib/commands/botCommands.js` and a corresponding module.

#### Reactions
- To add roles for specific emojis you can specify them in the `config.json` file.
- You can add functionality for reactions to specified messages under `lib/reactions/botReactions.js` and a corresponding module. 

#### Backup Messages
- Each message will be written to MongoDB. Data includes guild, channel, author, content, timestamp, and message id. 
- You can specify a different schema or database under `lib/database`.

#### Deployment
- This app is deployed to Heroku. Kept awake using Kaffeine.

#### Configurations
- You can specify a string for the command prompt.
- For the weather command, you can specify a default city and temperature unit.
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

If you have any questions/requests please contact me @SoorajModi
