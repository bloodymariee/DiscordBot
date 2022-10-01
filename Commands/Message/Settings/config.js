const { Message, MessageEmbed } = require("discord.js");
const WUMPUSBOT = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "config",
  aliases: ["cnf"],
  description: `see config of current server`,
  userPermissions: [],
  botPermissions: [],
  category: "Settings",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

  /**
   *
   * @param {WUMPUSBOT} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  run: async (client, message, args, prefix, queue) => {
    // Code
    let data = await client.music.get(message.guild.id);

    message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.config.embed.color)
          .setAuthor({
            name: `${message.guild.name} Config`,
            iconURL: message.guild.iconURL({ dynamic: true }),
          })
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addFields([
            {
              name: `Prefix`,
              value: `\`${prefix}\``,
            },
            {
              name: `DJ`,
              value: `${
                data.djrole
                  ? `${client.config.emoji.SUCCESS} \`Enabled\``
                  : `${client.config.emoji.ERROR}  \`Disabled\``
              }`,
            },
            {
              name: `Autoresume`,
              value: `${
                data.autoresume
                  ? `${client.config.emoji.SUCCESS} \`Enabled\``
                  : `${client.config.emoji.ERROR}  \`Disabled\``
              }`,
            },
            {
              name: `24/7`,
              value: `${
                data.vc.enable
                  ? `${client.config.emoji.SUCCESS} \`Enabled\``
                  : `${client.config.emoji.ERROR}  \`Disabled\``
              }`,
            },
            {
              name: `Request Channel`,
              value: `${
                data.music.channel
                  ? `<#${data.music.channel}>`
                  : `${client.config.emoji.ERROR}  \`Disabled\``
              }`,
            },
          ])
          .setFooter(client.getFooter(message.author)),
      ],
    });
  },
};