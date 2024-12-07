import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");
interface UserInfo {
    id: number;
    name: string;
    gender: string;
    age: number;
    hobby: string[];
    coffeeshop: string;
    time: string;
    status : string
}

const info: UserInfo = {
    id: 0,
    name: "",
    gender: "",
    age: 0,
    hobby: [],
    coffeeshop: "",
    time: "",
    status: ""
};

bot.command(
    "start",
    (ctx) => ctx.reply("Добро пожаловать👋\n"+
    "Меня зовут RandomCoffeeBot.\n"+ 
    "Что я умею❓\n"+ 
    "Я помогу найти вам людей для интересного общения на общие темы. А встретиться вы сможете за чашечкой в любимой кофейне☕\n"+
    "Давайте создадим анкету, чтобы с вами могли назначить встречу.\n"+
    "Используйте команду /createprofile для создания вашей анкеты.\n"+
    "Также не забудьте прочитать правила пользования. /help\n"), 
);

bot.command(
    "about",
    (ctx) => ctx.reply("Бот для поиска людей с схожими интересами, создан учениками 9 класса Лицея №54 и студентом кафедры ПМиФИ ОмГТУ во время 6 сезона проектной школы🏫"),
);

bot.command(
    "help",
    (ctx) => ctx.reply("Что я умею:\n"+
    "ℹ️ /about - краткая информация о боте\n"+
    "💾 /createprofile - создание своей анкеты\n"+
    "📝 /editprofile - изменение своей анкеты\n"+
    "👤 /myprofile - просмотр своей анкеты\n"+
    "🗑️ /deleteprofile - удаление своей анкеты\n"+
    "❌Запрещено:\n"+
    "📢Любой вид рекламы в анкетах.\n"+
    "🔞Любой 18+ контент\n"+
    "🇷🇺Любой контент, запрещённый на территории Российской Федерации\n"+
    "➤Любой контент, запрещённый правилами Telegram\n"+
    "✅Разрешено:\n"+
    "✉️Искать людей для общения:)")
);

bot.command(
    "createprofile", async (ctx) => {
        if (info.name=="")
        {
            await ctx.reply("Давайте создадим анкету. Для начала напишите своё имя.")
            info.status = "name";
        }
        else
        {
            await ctx.reply("⚠️У вас уже создана анкета⚠️");
        }
});

const gender = new InlineKeyboard()
    .text("Парень👨‍💼", "man")
    .text("Девушка👩‍💼", "woman")

bot.callbackQuery("man", async (ctx) =>{
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.gender="парень";
});

bot.callbackQuery("woman", async (ctx) =>{
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.gender="девушка";
});

bot.command(
    "editprofile",
    (ctx) => {
        if (info.name!="")
        {
        ctx.reply("Чтобы вы хотели изменить?", { reply_markup: edit })
        }
        else
        {
            ctx.reply("⚠️У вас ещё не создана анкета⚠️");
        }
    });

bot.command(
    "myprofile",
    (ctx) => {
    if (info.name!="")
    {
    ctx.reply("Сейчас ваша анкета выглядит вот так:\nПривет!\n"+
    `Меня зовут ${info.name}\n`+ 
    // `Я ${info.gender}\n`+ 
    `Мне ${info.age}\n`+
    `Мои увлечения: ${info.hobby}\n`+
    `Моя любимая кофейня: ${info.coffeeshop}\n`+
    `Удобное время для встречи: ${info.time}\n`)
    }
    else
    {
        ctx.reply("⚠️У вас ещё не создана анкета⚠️");
    }
});

const edit = new InlineKeyboard()
    .row().text("Имя", "name").text("Возраст", "age")
    .row().text("Кофейня", "coffeeshop").text("Время встречия","time")
    .row().text("Увлечения", "hobby")
    .row().text("Удалить анкету", "deleteprofile");

bot.callbackQuery("name", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новое имя.");
});

bot.callbackQuery("age", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новый возраст.");

});

bot.callbackQuery("time", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новое время встречи.");
});

bot.callbackQuery("hobby", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новые увлечения.");
});

bot.callbackQuery("coffeeshop", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новую кофейню.");
});

const YesNo = new InlineKeyboard()
    .text("Да✅", "yes")
    .text("Нет❌", "no")

bot.callbackQuery("yes", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.id = 0;
    info.name = "";
    info.gender = "";
    info.age = 0;
    info.hobby = [];
    info.coffeeshop = "";
    info.time = "";
    info.status = "";
    await ctx.reply("Ваша анкета была удалена.");
})

bot.callbackQuery("no", async (ctx) =>{
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Хорошо. Ваша анкета не была удалена.");
})

bot.callbackQuery("deleteprofile", async (ctx) => {
    if(info.name !="")
    {
        await ctx.answerCallbackQuery();
        await ctx.deleteMessage();
        await ctx.reply("Вы уверены, что хотите удалить свою анкету?",{ reply_markup: YesNo });
    }
    else
    {
        await ctx.reply("⚠️У вас ещё не создана анкета⚠️")
    }
});

bot.command(
    "deleteprofile",
    (ctx) => {
        if (info.name!="")
        {
            ctx.reply("Вы уверены, что хотите удалить свою анкету?",{ reply_markup: YesNo });
        }
        else
        {
            ctx.reply("⚠️У вас ещё не создана анкета⚠️");
        }
    });

const decision = new InlineKeyboard()
    .text("Согласен👍", "/accept")
    .text("Против👎", "/decline")

bot.callbackQuery("/accept", async (ctx) =>{
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Отлично!");
});

bot.callbackQuery("/decline", async (ctx) =>{
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Жаль... Буду искать нового собеседника.");
});

bot.on("message", async (ctx) =>{
    if (info.status) {
        switch (info.status) {

            case "name":
                if (ctx.msg.text!= undefined){
                info.name = ctx.msg.text;
                };
                info.status = "age";
                await ctx.reply("Сколько вам лет?");
                break;

            case "age":
                info.age = Number(ctx.msg.text);
                info.status = "hobby";
                await ctx.reply("Хотелось бы узнать о ваших увлечениях, перечислите их через запятую.");
                break;

            case "hobby":
                if (ctx.msg.text!= undefined){
                info.hobby = ctx.msg.text.split(",");
                info.status = "coffeeshop";}
                await ctx.reply("Теперь укажите адрес вашей любимой кофейни.")
                break;

            case "coffeeshop":
                if (ctx.msg.text!= undefined){
                info.coffeeshop = ctx.msg.text;
                };
                info.status = "time";
                await ctx.reply("Напишите удобное время для встречи.")
                break;

            case "time":
                if (ctx.msg.text!= undefined){
                info.time = ctx.msg.text;
                await ctx.reply("Отлично🤩\n" +
                    "Твоя анкета выглядит так:\n"+
                    "Привет!\n"+
                    `Меня зовут ${info.name}\n`+ 
                    // `Я ${info.gender}\n`+ 
                    `Мне ${info.age}\n`+
                    `Мои увлечения: ${info.hobby}\n`+
                    `Моя любимая кофейня: ${info.coffeeshop}\n`+
                    `Удобное время для встречи: ${info.time}\n`)};
                info.status = "done"
                break;

            // case "gender":
            //     await ctx.reply("Теперь укажите свой пол.", { reply_markup: gender })
            //     break;   
            default:
                break;   
        }
    }
});
