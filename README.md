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

1. Install [nodejs], Botomir requires v10.24.0 or higher.
2. Install Docker on your system
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
9. Start the application for development `npm run dev`


#### Build the Docker image

```bash
$ docker build \
   --build-arg VCS_REF=$(git rev-parse -q --verify HEAD) \
   --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
   -t botomir .
```

#### Running with Docker

To run Botomir using the provided `docker-compose` file some environment variables need to be set first in the `.env` file. 
A template of this file is provided in the `compose.env` file. 

Then run `docker compose up -d` to start the database and the botomir application. 


Or you can start only the botomir container with the following command.
Be sure to set all of the required environment variables. 

```
$ docker run -p 80:8300 \
    -e DISCORD_TOKEN=token \
    .... \
    --name botomir \
    marshallasch/botomir
```

#### Stopping the container

The Botomir Docker container can be stopped using the `SIGTERM` signal:

```bash
$ docker kill -s SIGTERM <container name>
```

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
- Each message will be written to MongoDB. Data includes server, channel, author, content, timestamp, and message id.
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
