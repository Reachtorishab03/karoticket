require("dotenv").config()
const Discord = require('discord.js')
const { GCommands } = require("gcommands");
require("./classes/TextChannel")
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION', 'GUILD_MEMBER']});

client.tickets = {
    category: process.env.ticketCategory,
    closedCategory: process.env.ticketClosedCategory,
    moderatorRole: process.env.ticketModeratorRole
}

client.on('ready', async () => {
    client.user.setActivity({ type: "COMPETING", name: `docs.karot.xyz`});
    const GCommandsClient = new GCommands(client, {
        cmdDir: "commands/",
        eventDir: "events/",
        unkownCommandMessage: false,
        language: "english",
        slash: {
            slash: 'both',
            prefix: '.'
        },
        defaultCooldown: 1,
    })

    GCommandsClient.on("debug", (debug)=>{
        console.log(debug)
    })
    console.log('logged in')
})

client.login(process.env.token)
