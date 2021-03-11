## Commands

### User Commands

#### Ping

- Command: `ping`
- Returns: `Pong`
- Example usage:
```
User
> !ping

Botomir
> Pong
```

#### Help

- Command: `help`
- Args:
    - optional,`<command>`
- Returns: 
    - list of commands available to Botomir
    - specific information about the passed in command if command specified
- Example usage:
```
User
> !help

Botomir
> <embedded help message>
```
```
User
> !help ping

Botomir
> <embedded message with information about ping command>
```

#### Site

- Command: `site`
- Returns: an embedded message with a link to Botomir.com
- Example usage:
```
User
> !site

Botomir
> <embedded message with link to Botomir.com>
```

#### Docs

- Command: `docs`
- Returns: an embedded message with a link to Botomir.com/documentation.
- Example usage:
```
User
> !docs

Botomir
> <embedded message with link to Botmir's documentation>
```

#### Source

- Command: `source`
- Returns: an embedded message with a link to Botomir's source code on GitHub
- Example usage:
```
User
> !source

Botomir
> <embedded message with link to source code>
```

#### Weather

- Command: `weather`
- Returns: an embedded message with the weather information for a city
- Example usage:
```
User
> !weather

Botomir
> <embedded weather message>
```

#### Reddit

- Command: `reddit`
- Args:
    - required, `<subreddit>`
- Returns: an embedded link to a post from the specified subreddit
- Limitations:
  - Cannot send links to text, video, or audio posts. Only pictures or gifs
- Example usage:
  - `!reddit funny`
```
User
> !reddit funny

Botomir
> <embedded message with reddit post>
```

#### Meme

- Command: `meme`
- Returns: an embedded link to a post from a set of default subreddits
- How to configure:
  - `botomir-admin` role required to configure
  - `!add-meme-sub subreddit` will add a specified subreddit to the list of subreddits meme will randomly pull from
- Example usage:
```
User
> !meme

Botomir
> <embedded message with meme>
```

#### Cute

- Command: `cute`
- Returns: an embedded link to a post from a set of default subreddits
- How to configure:
  - `botomir-admin` role required to configure
  - `!add-cute-sub subreddit` will add a specified subreddit to the list of subreddits meme will randomly pull from
- Example usage:
```
User
> !cute

Botomir
> <embedded message with image of cute animal>
```

#### Puppy

- Command: `puppy`
- Returns: an embedded link to a post from r/puppy
- Example usage:
```
User
> !puppy

Botomir
> <embedded message with puppy image>
```

#### Mental Health

- Command: `mental-health`
- Returns: embedded message with mental health resources
- Example usage:
```
User
> !mental-health

Botomir
> <embedded message with link to mental-health resources>
```

#### Mechanical Keyboard

- Command: `keeb`
- Returns: embedded message with mechanical keyboard resources
- Example usage:
```
User
> !keeb

Botomir
> <embedded message with links to mechanical keyboard resources>
```

### Moderation Commands

#### Assign role to self

- Command: `role`
- Args:
    - requires`<name_of_role>` as only argument
- Returns: user is assigned the specified role and a success or failure message is sent
- Limitations:
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with `@` tag
- Example usage:
```
User
> !role minecraft

Botomir
> Successfully added role `minecraft` to user `User`
```

#### Assign role

- Command: `give`
- Args:
    - requires `@user` as first argument
    - requires `<name_of_role>`as second argument
- Returns: specified user is assigned the specified role and a success or failure message is sent
- Limitations:
  - user must be specified with `@` tag
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with `@` tag
- Example usage:
  - `!give @user minecraft`
```
User
> !give @User minecraft

Botomir
> Successfully added role `minecraft` to user `User`
```

#### Remove role

- Command: `remove`
- Args:
    - requires`<name_of_role>` as only argument
- Returns: specified role assignment is removed from user and a success or failure message is sent
- Limitations:
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with `@` tag
- Example usage:
```
User
> !remove minecraft

Botomir
> Successfully removed role `minecraft` from user `User`
```

#### Revoke role from user

- Command: `revoke`
- Args:
    - requires `@user` as first argument
    - requires `<name_of_role>`as second argument
- Returns: specified role assignment is removed from specified user and a success or failure message is sent
- Limitations:
  - user must be specified with `@` tag
  - role must be assignable, cannot be a privileged role or a higher role than Botomir
  - role must be spelt exactly as it appears
  - do not specify role with `@` tag
- Example usage:
```
User
> !revoke @User minecraft

Botomir
> Successfully removed role `minecraft` from user `User`
```
### Admin Commands (require botomir-admin role)

#### Set command prefix

- Command: `set-prefix`
- Args:
    - requires`<new_prefix>` as only argument
- Returns: Botomir is updated to use the new command prefix and a success or failure message is sent
- Specifications:
  - Use the ping command to confirm the prefix is updated
- Example usage:
```
User
> !set-prefix \

Botomir
> Settings updated.
```

#### Set channel for role reactions

- Command: `set-role-channel`
- Args:
    - requires `<channel tag>` as only argument
- Returns: Role watch channel set and success or failure message is sent
- Example usage
```
User
> !set-role-channel #welcome

Botomir
> Settings updated.
```

#### Set role mappings for reaction assignment

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
