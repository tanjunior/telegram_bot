const PORT = process.env.PORT || 8080
const URL = process.env.URL || ""
const TOKEN = process.env.TOKEN || '5731397340:AAGgKqYu5Zgtt0ycOxoUIewAoN_EFzApqQU'
const axios = require('axios').default
const { Telegraf } = require('telegraf');

const bot = new Telegraf(TOKEN);
bot.telegram.setWebhook(`${URL}/bot${TOKEN}`)


bot.command('start', async (ctx) => {
    await bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot. Look at the menu for commands', {
    })
})

bot.command('/7trend', async (ctx) => {
    console.log("bot command received! [/7trend]")
    
    const url = "https://shy-ruby-cougar-hat.cyclic.app/7trends"
    await axios.get(url).then(response => {
        let trends = response.data
        let articles = []        
        trends.forEach(element => {
            element.articles.forEach(article => {
                let arr = [{text: article.title, url: article.url}]
                articles.push(arr)
            })
            bot.telegram.sendPhoto(ctx.chat.id, element.image.imageUrl, {
                caption: "[" + element.formattedTraffic + " Views] " + element.title.query + "\n" + element.image.newsUrl + "\nMore related News below",
                reply_markup: {
                    inline_keyboard: articles
                }
            })
            articles = []
        });

        
    })

})


bot.startWebhook(`/bot${TOKEN}`, null, PORT)

//process.once("SIGINT", () => bot.stop("SIGINT"))
//process.once("SIGTERM", () => bot.stop("SIGTERM"))
bot.launch();