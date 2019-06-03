module.exports = {
    name: 'reboot',
    aliases: ['shutdown', 'restart'],
    execute: function(message) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        message.reply('Rebooting Discord Bot').then(() => {
            process.exit();
        });
    }
}