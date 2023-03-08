const {SlashCommandBuilder} = require('discord.js')

module.exports ={
   data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription("Toca musicas descobertas na semana"),

    async execute(interaction){
        await interaction.reply('https://open.spotify.com/playlist/37i9dQZEVXcHCoyfXSxO6b?si=wuNs8FaGRrm4zSeF71N0bA')
    }
}
