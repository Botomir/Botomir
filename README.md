![Node.js CI testing](https://github.com/SoorajModi/botomir/workflows/testing/badge.svg)
![Node.js CI linter](https://github.com/SoorajModi/botomir/workflows/linter/badge.svg)
![David](https://img.shields.io/david/SoorajModi/botomir?style=plastic)
![David](https://img.shields.io/david/dev/SoorajModi/botomir?style=plastic)
![Lines of code](https://img.shields.io/tokei/lines/github/SoorajModi/botomir?style=plastic)
![Docker Pulls](https://img.shields.io/docker/pulls/marshallasch/botomir?style=plastic)
![GitHub](https://img.shields.io/github/license/SoorajModi/botomir?style=plastic)
![Discord](https://img.shields.io/discord/788091112476770353?style=plastic)
![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m788089375-708361efbca4ea5bc2bac0bf?style=plastic)

[![Join our Discord server!](https://invidget.switchblade.xyz/788091112476770353)](https://discord.gg/sdXnDWrruS)

# Botomir

Your friendly neighbourhood Discord Bot.

## How to add to your server

Go to this [site](https://botomir.com) and click `Add to Server`.

## How to run

Install node modules `npm install`

Copy the `template.env` file to `.env`, and set all of the values for those fields.

Add husky for commit hooks `npm run prepare`

Run locally using `node app.js`

### Run using docker

1. install docker on your system


#### Docker Compose version 3 config file

```yaml
version: "3.9"
services:
  botomir:
    image: marshallasch/botomir:latest
    container_name: botomir
    environment:
      - DISCORD_TOKEN: development
      - DATABASE_URL: 'mongodb://botomir:botomir@mongo/discordbot?authSource=admin'
      - SPOTIFY_CLIENT_ID: '1234567890'
      - SPOTIFY_CLIENT_SECRET: abcde234543
      - BASE_URL: 'https://botomir.com'
      - BOTOMIR_NOTIFICATION_GUILD: '1029384756'
      - BOTOMIR_NOTIFICATION_CHANNEL: '1234567890'
      - MODE: production
    ports:
      - "80:8300"
  mongo:
    image: mongo:latest
    container_name: mongo
    ports:
      - "27017:27017"
```

and run `docker-compose up -d` to startup the application.

Or run `docker run -p 80:8300 -e DISCORD_TOKEN=token .... --name botomir marshallasch/botomir`


### Required Permissions
- manage server
- change nickname
- manage nicknames
- view channels
- send Messages
- embedded Links
- read message history

In order to use any of the bot configuration commands you must have the role `botomir-admin` assigned to you.

## Features

#### Commands
- Use `command-prompt` + `help` to view all commands.
- To add a new command you add the command to `lib/commands/botCommands.js` and a corresponding module.

#### Reactions
- You can add functionality for reactions to specified messages under `lib/reactions/botReactions.js` and a corresponding module.

#### Backup Messages
- Each message will be written to MongoDB. Data includes guild, channel, author, content, timestamp, and message id.
- Each Spotify track that is sent to the `DISCORD_MUSIC_CHANNEL_ID` will be stored in the database.
- An authenticate token database will also be maintained for Spotify access tokens.
- You can specify a different schema or database under `lib/database`.

#### Deployment
- This app is deployed to the hobby tier of Heroku. Available 24/7.

#### Configurations
- You can specify a string for the command prompt.
- For the weather command, you can specify a default city and temperature unit.
- You can specify the Spotify playlist name (the date will get added to the end still) and the playlist description text.
- You can add privileged roles for which the bot cannot add/remove.

### Role permissions
Requires following role permissions
- Manage server
- Manage roles
- Manage channels
- Manage nicknames
- Send messages
- Manage messages
- Embed Links
- Attach files
- Read message history
- Add reactions

## Contact

If you have any questions/requests please feel free to create a new issue.
