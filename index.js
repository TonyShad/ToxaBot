var TelegramBot = require('node-telegram-bot-api');
var _ = require('lodash');

// Устанавливаем токен, который выдавал нам бот.
var token = '650570106:AAF4iuCjdSr144jXQm6UKM1l5tcdPmH92PA';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

let bidloMode = []

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.chat.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/bidloMode (.+)/, (msg, match) => {
    let id = msg.chat.id;
    if(match[1] == "true" && _.findIndex(bidloMode, function(o) {return o.chat == id}) == 0) {
        bidloMode.push({"chat": id, "mode": "on"});
        bot.sendMessage(id, "Bidlo Mode set to True");
    } else {
        bidloMode = _.remove(bidloMode, function(n) {
            return n.chat == id;
        });
        bot.sendMessage(id, "Bidlo Mode set to False")
    }
})

bot.onText(/\/sosat /, (msg) => {
    let id = msg.chat.id
	bot.sendMessage(id, "VSEM SOSAT")
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
        if (curDate.getHours() == 15 && curDate.getMinutes() == 50 && curDate.getSeconds() == 1) {
            bidloMode.map((item, i) => {
                if(item.mode == "on") {
                    bot.sendMessage(item.chat, "Бля, еще двутораху сидеть")
                }
            })
        	
        }
           
},1000);