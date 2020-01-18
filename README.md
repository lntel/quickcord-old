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
Below is the standard method used to define commands. As of version `4.5.9` you are now able to provide an array of aliases opposed to just a single command. Both an example of using a single command and an array of aliases are shown in the example below.
```js
// Single command alias
command.on('ping', (res, args) => {
    res.reply('pong');
});

// Multiple command aliases
command.on(['hey', 'hi'], (res, args) => {
    res.reply('Hello world');
});
```
## Command Loader
The command loader simply loads all `.js` files within the provided directory and loads all of them automatically into the command handler for ease-of-use.
```js
command.loadCommands('./commands', files => {
    files.map(file => console.log(`${file.name} Loaded`));
});
```
Each file which is loaded by the command loaded should be structured as is shown in the example below. As of `4.5.9` there is also now a disabled key which can be used to either disabled commands which have bugs or are still within development. Additionally, the `name` key may now also be an array of aliases however, it may also simply be a single string which represents a command trigger.
```js
// Basic command
module.exports = {
    name: "ping",
    call: (res, args) => {
        res.reply("pong");
    }
};

// Disabled command
module.exports = {
    name: "ping",
    disabled: true,
    call: (res, args) => {
        res.reply("pong");
    }
};

// Command with multiple aliases
module.exports = {
    name: ['ping', 'pong'],
    call: (res, args) => {
        res.reply("pong");
    }
};
```
I suggest personally, that you create a directory specifically for commands as this has shown to be quite effective and efficient.

## Reserved Events
As of version `4.5.9` reserved commands are deprecated. In future these will exist again however, currently, they are not feasible as Quickcord is no longer using an EventEmitter.

# Embeds
The original way of creating embeds within Discord.js is quite ugly so in Quickcord I have tidied this up by using an object as a parameter with all of the embed properties defined within. As of `4.5.9` the Quickcord embed is no longer a class therefore, does not require `new` to instantiate it.

Example:
```js
const Quickcord = require('quickcord');
const embed = Quickcord.Embed({
    title: 'test',
    description: 'testing this',
        color: '#1AC588',
        fields: [
            { name: 'test', value: 'testing', inline: true }
        ]
});
```

We currently do not support all properties but they will be added soon.