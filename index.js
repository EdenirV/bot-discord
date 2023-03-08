// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
// dotenv
const dotenv = require('dotenv')
dotenv.config()
const {TOKEN, CLIENT_ID, GUILD_ID}= process.env

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()
// roda por dentro do array de comandos do commandsFile que é retornado e busca cada um dos comandos

for (const file of commandsFiles){
	const filePath = path.join(commandsPath,file)
	const command = require(filePath)
	
	// condição para ver se existe data(dado) no comando
	if("data" in command && "execute" in command){
		client.commands.set(command.data.name, command)
	}else{
		console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes`)
	}
	
}
// Log in to Discord with your client's token
client.once(Events.ClientReady, c => {
	console.log(`Pronto! login realizado como ${c.user.tag}`);
});
client.login(TOKEN);

// interaçõescom o BOT

client.on(Events.InteractionCreate, async Interaction =>{
	if (Interaction.isStringSelectMenu()){

		const selected = Interaction.values[0]
        if (selected == "javascript"){
            await Interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python"){
            await Interaction.reply("Documentação do Python: https://www.python.org")
        } else if (selected == "csharp"){
            await Interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
        } else if (selected == "discordjs"){
            await Interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
	}
	if(!Interaction.isChatInputCommand()) return
	const command = Interaction.client.commands.get(Interaction.commandName)
	if(!command){
		console.error('Comando não encontrado')
		return
	}
	try{
		await command.execute(Interaction)
	}
	catch(error){
		console.error(error)
		await Interaction.reply('Houve um erro ao executar esse comando')
	}
})