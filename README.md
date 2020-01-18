# About
Quickcord is a discord.js wrapper which allows you to easily and swiftly create commands for your discord bot without all of the setup normally required.

# Installation

`npm i quickcord --save`

# Getting Started

To get started, firstly require the Quickcord library and then you can create a new instance of the Quickcord client. Within the constructor, the first parameter is your bot token which you can find here: https://discordapp.com/developers/applications/ and the second parameter is your command prefix which is the character which you want to have infront of all of your commands, for example: `.help`.

Furthermore, you can also provide an array of characters to your command prefix so you could for example use both, `.` and `+` or whatever character you have chosen. If you do not provide a prefix or an array, the prefix will be set to `.` by default.

```js
const Quickcord = require('quickcord');

const command = new Quickcord.Client('token', ['.']);

command.on('loaded', console.log);

command.on('help', (res, args) => {
    const embed = Quickcord.Embed({
        title: 'test',
        description: 'testing this',
        color: '#1AC588',
        fields: [
            { name: 'test', value: 'testing', inline: true }
        ]
    });

    res.reply(embed);
});
```

# Command Handling
Quickcord has two different ways to handle commands, the first way which has been within Quickcord from the beginning is using the `.on()` method to listen to a specific command however, with version 2.4.8 it is now possible to load all your commands from a directory. 

The command loader previously had a memory leak however, since `2.4.9` this has been fixed.

## Standard Command Definition
Below is the standard method used to define commands.
```js
command.on('ping', (res, args) => {
    res.reply('pong');
});
```
## Command Loader
And here is the new command loader which can now be used.
```js
command.loadCommands('./commands', files => {
    files.map(file => console.log(`${file.name} Loaded`));
});
```
This command loader has a callback which contains an array of objects consisting of commands that were successfully loaded. The object is structured as such: 
```json
{
    name: "commandnamehere"
}
```
With the command handler however, each command file must be formatted like so:
```js
module.exports = {
    name: "ping",
    call: (res, args) => {
        res.reply("pong");
    };
};
```
I suggest personally, that you create a directory specifically for commands as this has shown to be quite effective and efficient.

## Reserved Events
Reserved events within Quickcord are events which cannot be used as commands as they already serve a purpose within the functionality of Quickcord. These events are listed below coupled with their purpose.

### Loaded
The loaded event simple checks whether your bot could successfully connect to the Discord API. Within the callback for this method there is a message stating the connection was successful otherwise an error will be thrown.

#### Usage
```js
command.on('loaded', message => {
    console.log(message);
})
```

# Embeds
The original way of creating embeds within Discord.js is quite ugly so in Quickcord I have tidied this up by using an object as a parameter with all of the embed properties defined within.

Example:
```js
const Quickcord = require('quickcord');
const embed = new Quickcord.Embed({
    title: 'test',
    description: 'testing this',
        color: '#1AC588',
        fields: [
            { name: 'test', value: 'testing', inline: true }
        ]
});
```

We currently do not support all properties but they will be added soon.