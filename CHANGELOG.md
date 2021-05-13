# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Latest]
### Added
- added support for the bot to be on multiple discord servers
- added support for bot admin commands to configure the bot settings
- added the ability to automatically parse the role reaction emojs
- added a bunch of new commands
- added moderation tools to keep message logs
- added the ability to handle webhooks from github and gitlab
- added the ability to roll dice
- added coin flips
- can automatically render message links 
- can automatically assign roles based on reactions to a message
- can generate Spotify playlists


### Changed
- now uses a database for the bot configuration and not config file
- help command is split into categories
- mental health links are now configurable
- server weather command location can be configured
- DMs no longer cause the app to crash

## [2.0.1] - 2020-12-20
### Changed
- fixed a deployment bug where heroku would try to start the wrong start file.


## [2.0.0] - 2020-12-20
### Added
- some unit tests
- github actions CI/CD pipelines
- added support for generating Spotify playlists
- this changelog
- added style guideline for the project

### Changed
- removed and condensed some duplicate code in different modules

## [1.0.0] - 2020-12-14
### Added
- Inital version  (no notes here)
