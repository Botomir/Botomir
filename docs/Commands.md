## Commands

### User Commands

#### Ping

- Command: `!ping`
- Returns: `pong`
- Example usage:
  - `!ping`

#### Help

- Command: `!help`
- Returns: list of commands available to Botomir
- Specification:
  - Can add command as argument to gain more information about that specific command
- Example usage:
  - `!help`
  - `!help ping`

#### Site

- Command: `!site`
- Returns: an embedded message with a link to Botomir.com
- Example usage:
  - `!site`

#### Docs

- Command: `!docs`
- Returns: an embedded message with a link to Botomir.com/documentation.
- Example usage:
  - `!docs`

#### Source

- Command: `!source`
- Returns: an embedded message with a link to Botomir's source code on GitHub
- Example usage:
  - `!source`

#### Weather

- Command: `!weather`
- Returns: an embedded message with the weather information for a city
- Example usage:
  - `!weather`

#### Reddit

- Command: `!reddit subreddit`
- Returns: an embedded link to a post from the specified subreddit
- Limitations:
  - Cannot send links to text, video, or audio posts. Only pictures or gifs
- Example usage:
  - `!reddit funny`

#### Meme

- Command: `!meme`
- Returns: an embedded link to a post from a set of default subreddits
- List of default subreddits:
- How to configure:
  - `!add-meme-sub subreddit` will add a specified subreddit to the list of subreddits meme will randomly pull from
  - Requires `botomir-admin` role to configure
- Example usage:
  - `!meme`

#### Cute

- Command: `!cute`
- Returns: an embedded link to a post from a set of default subreddits
- List of default subreddits:
- How to configure:
  - `!add-cute-sub subreddit` will add a specified subreddit to the list of subreddits meme will randomly pull from
  - Requires `botomir-admin` role to configure
- Example usage:
  - `!cute`

#### Puppy

- Command: `!puppy`
- Returns: an embedded link to a post from r/puppy
- Example usage:
  - `!puppy`

#### Mental Health

- Command: `!mental-health`
- Returns: embedded message with mental health resources
- Example usage:
  - `!mental-health`

#### Mechanical Keyboard

- Command: `!keeb`
- Returns: embedded message with mechanical keyboard resources
- Example usage:
  - `!keeb`

### Moderation Commands

#### Assign role to self

- Command: `!role <name_of_role>`
- Returns: user is assigned the specified role and a success or failure message is sent
- Specifications:
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with @ tag
- Example usage:
  - `!role minecraft`

#### Assign user a role

- Command: `!give @user <name of role>`
- Returns: specified user is assigned the specified role and a success or failure message is sent
- Specifications:
  - user must be specified with @ tag
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with @ tag
- Example usage:
  - `!give @user minecraft`

#### Remove role from self

- Command: `!remove <name_of_role>`
- Returns: specified role assignment is removed from user and a success or failure message is sent
- Specifications:
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with @ tag
- Example usage:
  - `!remove minecraft`

#### Revoke role from user

- Command: `!revoke @user name_of_role`
- Returns: specified role assignment is removed from specified user and a success or failure message is sent
- Specifications:
  - user must be specified with @ tag
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with @ tag
- Example usage:
  - `!revoke @user minecraft`

### Admin Commands (require botomir-admin role)

#### Set command prefix

- Command: `!set-prefix new_prefix`
- Returns: Botomir is updated to use the new command prefix and a success or failure message is sent
- Specifications:
  - Use the ping command to confirm the prefix is updated

#### Set channel for role reactions

- Command: `!set-role-channel <channel tag>`
- Returns: Role watch channel set and success or failure message is sent
- Example usage
  - `!set-role-channel #welcome`

#### Set role mappings for reaction assgnment

- Command: `!set-roles <message>`
- Returns: Botomir will autogenerate a role assignment message to the specified role watch channel
- Specifications
  - The role assignment can start with a message and be followed by `---` to specify role reactions
  - You can specify role reactions using the following format: `<emoji> :<name of role>`
  - To set a custom name for the role you can use the following format: `<emoji> : <name of role> : <custom name>`
  - This command can only be called after the `set-role-channel` command is executed
- Example usage:

````
!set-roles This is a really cool message about automated role assignment

---
:fire: : role A : a super cool role
:waffle: : role B
````

And will autogenerate on yoyu

```
This is a really cool message about automated role assignment

:fire: : a super cool role
:waffle: : role B
```

#### Disable Command

- Command: `!disable-command <name of command>`
- Returns: command is disabled and success or failure message is sent
- Example usage:
  - `!disable-command reddit`

#### Enable Command

- Command: `!enable-command <name of command>`
- Returns: command is enabled and success or failure message is sent
- Example usage:
  - `!enable-command reddit`

#### Add meme subreddit

- Command: `!add-meme-sub <name of subreddit>`
- Returns: subreddit is added to list of meme subs and success or failure message is sent
- Example usage:
  - `!add-meme-sub funny`

#### Add cute subreddit

- Command: `!add-cute-sub <name of subreddit>`
- Returns: subreddit is added to list of cute subs and success or failure message is sent
- Example usage:
  - `!add-cute-sub aww`

#### Add good bot response

- Command: `!add-goodbot <custom response>`
- Returns: new response to user sending `good bot` and success or failure message is sent
- Example usage:
  - `!add-goodbot <3`

#### Add bad bot response

- Command: `!add-badbot <custom response>`
- Returns: new response to user sending `bad bot` and success or failure message is sent
- Example usage:
  - `!add-badbot </3`

#### Authenticate Spotify

- Command: `!authspotify`
- Returns: DM is sent to caller with link to authenticate Spotify
- Example usage:
  - `!authspotify`

#### Set music channel

- Command: `!set-music-channel`
- Returns: music channel Botomir will watch for is set and a success or failure message is sent
- Example usage: 
  - `!set-music-channel #songs`

#### Set playlist name

- Command: `!set-playlist-name`
- Returns: name of playlist Botomir will save songs to is set and a success or failure message is sent
- Example usage: 
  - `!set-playlist-name An Awesome Discord Playlist`

#### Set playlist description

- Command: `!set-playlist-description`
- Returns: description of playlist Botomir will save songs to is set and a success or failure message is sent
- Example usage: 
  - `!set-playlist-description Songs from my Discord server`

#### Create playlist

- Command: `!createplaylist`
- Returns: creates a new playlist with recently posted songs in the music channel, can also specify time period
