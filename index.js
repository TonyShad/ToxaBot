var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '650570106:AAF4iuCjdSr144jXQm6UKM1l5tcdPmH92PA';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.chat.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/sosat /, () => {
	bot.sendMessage("VSEM SOSAT")
})

// Простая команда без параметров.
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    // Фотография может быть: путь к файлу, поток(stream) или параметр file_id
    var photo = 'cats.png';
    bot.sendPhoto(chatId, photo, {caption: 'Милые котята'});
});


setInterval(function(){
        var curDate = new Date();
        if (curDate.getHours() == 15 && curDate.getMinutes() == 30 && curDate.getSeconds() == 1) {
        	bot.sendMessage("Бля, еще двутораху сидеть")
        }
           
},1000);