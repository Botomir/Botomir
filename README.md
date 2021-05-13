![Node.js CI testing](https://github.com/Botomir/botomir/workflows/testing/badge.svg)
![Node.js CI linter](https://github.com/Botomir/botomir/workflows/linter/badge.svg)
![David](https://img.shields.io/david/Botomir/botomir?style=plastic)
![David](https://img.shields.io/david/dev/Botomir/botomir?style=plastic)
![Lines of code](https://img.shields.io/tokei/lines/github/Botomir/botomir?style=plastic)
![Docker Pulls](https://img.shields.io/docker/pulls/marshallasch/botomir?style=plastic)
![GitHub](https://img.shields.io/github/license/Botomir/botomir?style=plastic)
![Discord](https://img.shields.io/discord/788091112476770353?style=plastic)
![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m788089375-708361efbca4ea5bc2bac0bf?style=plastic)

[![Join our Discord server!](https://invidget.switchblade.xyz/788091112476770353)](https://discord.gg/sdXnDWrruS)

![Botomir Logo](static/images/botomir.png)

# Botomir

Your friendly neighbourhood Discord Bot.


## How to add to your server

Go to this [site](https://botomir.com) and click `Add to Server`.

## How to run

1. Install [nodejs], Botomir will not run using v10.24.0 or lower.
2. install docker on your system
3. Start up a [mongodb] database
    ```bash
    $ docker run -p 27017:27017 -it -d --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo
    ```
4. Create the botomir user and grant them permissions on the database
  ```bash
  $ docker exec -it mongo bash
    >  mongo -u admin -p
    > use admin
    >  db.createUser({
        user: "bot_account",
        pwd: "bot_test_pass",
        roles: [ { role: "readWrite", db: "discordbot" } ]
      })
  ```
5. Create a discord bot application on https://discord.com/developers/applications
  - collect the client ID, client secret, and application token
6. Create a spotify application on https://developer.spotify.com/dashboard/applications
  - collect the client ID, and client secret
7. Copy the `template.env` file to `.env`, and set all of the values for those fields.
8. Install all of the node modules `npm ci`
9. Start the application for development `npm start`

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
