'use strict';

const EventEmitter = require('events');
const Discord = require('discord.js');

class CommandHandler extends EventEmitter {
    constructor(token, prefix = ['.']) {
        super();

        this._reservedEvents = ['loaded'];

        this._client = new Discord.Client();
        this._client.login(token)
        .then(result => {
            this.emit('loaded', 'Connection to Discord API established');
        })
        .catch(err => {
            throw err;
        });

        this._client.on('message', response => {
            const { content } = response;

            let prefixResult;

            if(typeof prefix === 'object') {
                prefixResult = prefix.find(current => current == content[0]);
            } else {
                prefixResult = prefix;
            }

            if(prefixResult === undefined || response.author.bot) return;

            const args = response.content.slice(prefixResult.length).split(' ');
            const command = args.shift().toLowerCase();

            const eventCheck = this._reservedEvents.find(event => command == event);

            if(eventCheck !== undefined) return;

            this.emit(command, response, args);
        });
    }

    _extract() {

    }
}

module.exports = CommandHandler;