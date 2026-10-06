const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: '10-O-iQF3.aternos.me', // Buraya Aternos IP adresini yaz
        port: 25565,                           // Sunucu portun (Aternos farklı port verdiyse onu yaz)
        username: 'AFK_Botu',                  // Botun oyundaki adı
        version: false
    });

    bot.on('spawn', () => {
        console.log('Bot sunucuya girdi ve AFK kalıyor!');
    });

    // AFK kalıp atılmaması için her 10 saniyede bir zıplar:
    setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);

    // Düşerse otomatik geri bağlanır:
    bot.on('end', () => {
        console.log('Bağlantı kesildi, 10 sn sonra tekrar deneniyor...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Hata:', err));
}

createBot();