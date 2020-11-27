# Skeleton-Discord-Bot

This is the skeleton functionality for a discord bot written in Node.js

## Features

#### Commands
- !ping, checks if the bot is alive
- !help, sends help message describing how to use the bot
- !role @role, gives self role (except admin)
- !role @user @role, gives user role (except admin)
- !remove @role, removes role from self (except admin)
- !remove @user @role, removes role from user (except admin)
- !mental-health, sends message with mental health resources
- !puppy, sends a random puppy picture

#### Backup Messages

Each message will be written to MongoDB. Data includes guild, channel, author, content, timestamp, and message id. 

#### Deployment

This app is deployed to Heroku.

## Contact

If you have any questions/requestion please contact me @SoorajModi