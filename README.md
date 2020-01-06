# About
Quickcord is a discord.js wrapper which allows you to easily and swiftly create commands for your discord bot without all of the setup normally required.

# Installation

`npm i quickcord --save`

Once installed using npm you can do the following:
```js
const Quickcord = require('quickcord');

const command = new Quickcord.CommandHandler('bot token', 'command prefix');

command.on('test', (res, args) => {
    res.reply("Hello world");
});
```