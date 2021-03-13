## Spotify

Botomir has the ability to connect to Spotify and generate playlist based on Spotify links sent to a specified channel.

### Authenticating with Spotify

To begin using the plugin you must first authenticate your Spotify account with Botomir using the `authspotify` command. 
Once the command is called, Botomir will message the caller through their DMs with a link to authenticate.

This is a per user command, once Botomir has been authenticated on a server, it does not have to be done again.

### Setting a music channel

Next you must set a channel for Botomir to listen in on using the `set-music-channel` command.

### Playlist configuration

You can configure the playlist including the title and description using the `set-playlist-name` and `set-playlist-description` commands.
The default values are `Awesome Discord Group Playlist` and `A playlist that contains all the songs that the discord group posted in the last little while.`
respectively.

### Creating a playlist

You can create a playlist using the `createplaylist` command. This will generate  generates a playlist using all of Spotify 
tracks that were shared in the past week in the music channel. The caller can specify other time periods as well.
