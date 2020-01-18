"use strict";

const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");

/**
 * This is the express-like command handler
 * It not longer extends EventEmitter however,
 * it is replicating the same behaviour
 */
class CommandHandler {
    constructor(token, prefix = ["."]) {
        // Define reserved event listeners
        this._reservedEvents = ["loaded"];

        // Connect to discord using provided token
        this._client = new Discord.Client();
        this._client
            .login(token)
            .then(result => {
                //this.emit('loaded', 'Connection to Discord API established');
            })
            .catch(err => {
                throw err;
            });

        this.prefix = prefix;
    }

    on(trigger, expectedParameters = undefined, func) {
        if (typeof func !== "function")
            throw new CommandHandlerException(
                "The second parameter is not a valid function"
            );

        if (typeof trigger !== "string" && typeof trigger !== "object")
            throw new CommandHandlerException(
                "The first parameter must be of type string or array"
            );

        if (typeof expectedParameters !== "number" && expectedParameters !== undefined)
            throw new CommandHandlerException(
                "The second parameter is expected to be a number"
            );

        this._client.on("message", response => {
            const {
                content
            } = response;

            let prefixResult;

            if (typeof this.prefix === "object") {
                prefixResult = this.prefix.find(current => current == content[0]);
            } else {
                prefixResult = this.prefix;
            }

            if (prefixResult === undefined || response.author.bot) return;

            const args = response.content.slice(prefixResult.length).split(" ");
            const command = args.shift().toLowerCase();

            //const eventCheck = this._reservedEvents.find(event => command == event);

            //if (eventCheck !== undefined) return;

            /**
             * Check if the alias/aliases exist
             * 
             * Everything after this command will happen only if
             * the command exists
             */
            if (typeof trigger === "string") {
                if (command !== trigger) return;
            } else if (typeof trigger === "object") {
                if (trigger.find(value => value == command) === undefined) return;
            }

            // Check if expected amount of arguments have been provided
            if(expectedParameters !== undefined) {
                if(args.length !== expectedParameters) {

                    response.delete();
    
                    response.reply('You have not formatted the command correctly')
                    .then(msg => msg.delete(3000))
                    .catch(console.error);
    
                    return;
                } else {
                    func(response, args);
                }
            } else {
                func(response, args);
            }

            //this.emit(command, response, args);
        });
    }

    /**
     *
     * @param {string} folder
     * @param {function} callback
     */
    async loadCommands(folder, callback) {
        const files = fs.readdirSync(path.resolve(folder));
        const loaded = [];

        //return console.log(files)

        files.map((file, index) => {
            let instance = require(path.join(path.resolve(folder), file));

            if (instance.name !== "" && typeof instance.call == "function") {
                // Check if command is disabled
                if (instance.disabled) return;

                loaded.push({
                    name: instance.name
                });

                this.on(instance.name, instance.expectedArguments, instance.call);
            } else {
                console.error(
                    `Unable to load ${file} as it was not correctly formatted`
                );
            }
        });

        callback(loaded);
    }
}

class CommandHandlerException extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CommandHandler;