const TelegramApi = require('node-telegram-bot-api')
const {gameOptions,againOtions} = require('./options')

const token = '5648583222:AAG9RrCMk_9TBGXw95JRo1jxH0xV086VqBU'

const bot = new TelegramApi( token, {polling:true})

const chats = {}

const startGame = async (chatId) => {
    
    await bot.sendMessage(chatId, 'сейчас я загадам число от 0 до 9, а ты должен угадать!')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'отгадай', gameOptions)
    

}

const start = () =>{
    bot.setMyCommands([
        {command: '/start', description: 'начальное привествие'},
        {command: '/info', description: 'получить инфо о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'}

    ])

    bot.on('message',async msg =>{
        const text = msg.text
        const chatId = msg.chat.id
        
        if(text === '/start'){
          return bot.sendMessage(chatId, 'Добро пожаловать, я бот которого создал начинающий программист')
        }
        if(text === '/info'){
         return bot.sendMessage(chatId, `тебя зову ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'я тебя не понимаю, попробуй еще раз)')
       })

       bot.on('callback_query',async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
           return  startGame(chatId)

        }
        if(data == chats[chatId]){
            await  bot.sendMessage(chatId, `поздравляю ты угадал цифру ${chats[chatId]}` , againOtions)
        }else{
            await  bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOtions)
        }
        
   })
    
}
start()
