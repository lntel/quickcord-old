const Quickcord = require('./src/index');
const fetch = require('node-fetch');

const command = new Quickcord.CommandHandler('NjI5NzE3MDc0MzE4NTg5OTky.XhOBKg.L5_ho_vUN6pNAJiSVaZDaOpyQNQ', '.');

command.on('loaded', message => {
    console.log(message);
})

command.on('search', (res, args) => {
    fetch(`https://api.imgur.com/3/gallery/search/?q=${args[0]}&mature=true`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Client-ID e04ef8758f4fa1f'
        },
    })
    .then(async response => {

        if(response.ok) {
            const data = await response.json();
            res.channel.send(data.data[0].link)
        }
    })
});

command.on('help', (res, args) => {
    const embed = new Quickcord.Embed({
        title: "test",
        description: "testing this thing"
    });

    res.channel.send(embed)
});