'use strict';

const Discord = require('discord.js');

module.exports = (options = {}) => {

    const Embed = new Discord.RichEmbed();

    const insertFields = (fields) => {
        fields.map(field => {
            Embed.addField(field.name, field.value, field.inline === undefined ? false : field.inline);
        });
    }

    if(options.title) Embed.setTitle(options.title);
    if(options.description) Embed.setDescription(options.description);
    if(options.color) Embed.setColor(options.color);
    if(options.fields) insertFields(options.fields);
    if(options.image) Embed.setImage(options.image);
    if(options.footer) Embed.setFooter(options.footer);
    if(options.thumbnail) Embed.setThumbnail(options.thumbnail);

    return Embed;
};