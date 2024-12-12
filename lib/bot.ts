//Будет доработан

import { Bot } from "https://deno.land/x/grammy@v1.32.0/mod.ts";
//import { createClient } from '@supabase/supabase-js';
import { UserInfo } from './interface.ts'
import { genderM, genderW } from './functions.ts'
import { edit, YesNo, gender, coffeeshops } from './inlinekeyboards.ts'

// Не реализовано
// const supabaseUrl = 'https://rcqxjuvsqeintzrkapgj.supabase.co';
// const supabaseKey = Deno.env.get("SUPABASE_KEY") || "";
// const supabase = createClient(supabaseUrl, supabaseKey);

export let users: Array<UserInfo> = [];

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

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
    (ctx) => {
        if (info.id == 0){
            ctx.reply("Добро пожаловать👋\n"+
            "Меня зовут RandomCoffeeBot.\n"+ 
            "Что я умею❓\n"+ 
            "Я помогу найти вам людей для интересного общения на общие темы. А встретиться вы сможете за чашечкой в любимой кофейне☕\n"+
            "Давайте создадим анкету, чтобы с вами могли назначить встречу.\n"+
            "Используйте команду /createprofile для создания вашей анкеты.\n"+
            "Также не забудьте прочитать правила пользования. /help\n");
        } else {
            ctx.reply("Привет👋\n"+
            "Давно не виделись.");
        }
    }
);

bot.command(
    "about",
    (ctx) => ctx.reply("Бот для поиска людей с схожими интересами, создан учениками 9 класса Лицея №54 и студентом кафедры ПМиФИ ОмГТУ во время 6 сезона проектной школы🏫\n"+
        "Разработчики:\n"+
        "[Леонкин Максим](t.me//THE_MAX1)\n"+
        "[Душенков Егор](t.me//Egor_Dushenkov)\n"+
        "[Дейкин Артем](t.me//abobkap)\n"+
        "[Вирясов Константин](t.me//Pfanner4012)\n"+
        "[Вакуленко Кирилл](t.me//KIrill1god)\n"+
        "[Бункевич Дмитрий](t.me//Dima_i5)\n"+
        "[Сбитнев Иван](t.me//Gajaka228)\n", { parse_mode: "Markdown" }),
);

bot.command(
    "help",
    (ctx) => ctx.reply("Что я умею:\n"+
    "ℹ️ /about - краткая информация о боте\n"+
    "💾 /createprofile - создание своей анкеты\n"+
    "👤 /myprofile - просмотр своей анкеты\n"+
    "📝 /editprofile - изменение своей анкеты\n"+
    "🗑️ /deleteprofile - удаление своей анкеты\n"+
    "❌Запрещено:\n"+
    "📢Любой вид рекламы в анкетах.\n"+
    "🔞Любой 18+ контент.\n"+
    "🇷🇺Любой контент, запрещённый на территории Российской Федерации.\n"+
    "➤Любой контент, запрещённый [правилами Telegram](https://telegram.org/tos/ru/).\n"+
    "🤬Использование нецензурной лексики в анкете.\n"+
    "✅Разрешено:\n"+
    "✉️Искать людей для общения:)", { parse_mode: "Markdown" } ),
);

bot.command(
    "createprofile", (ctx) => {
        if (info.id == 0){
            info.status = "createName";
            ctx.reply("Давайте создадим анкету. Для начала напишите своё имя.");
        } else {
            ctx.reply("⚠️У вас уже создана анкета⚠️");
        }
});

bot.command(
    "editprofile",
    (ctx) => {
        if (info.id != 0) {
        ctx.reply("Чтобы вы хотели изменить?", { reply_markup: edit });
        } else {
            ctx.reply("⚠️У вас ещё не создана анкета⚠️");
        }
    });

bot.command(
    "myprofile",
    (ctx) => {
    if (info.id != 0){
    ctx.reply("Ваши данные:\n"+
    `Имя: ${info.name}.\n`+ 
    `Пол: ${info.gender}.\n`+ 
    `Возраст ${info.age}.\n`+
    `Увлечения: ${info.hobby}.\n`+
    `Кофейня, в которой хочу встретиться: ${info.coffeeshop}\n`+
    `Удобное время для встречи: ${info.time}.\n`)
    } else{
        ctx.reply("⚠️У вас ещё не создана анкета⚠️");
    }
});

bot.callbackQuery("name", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новое имя.");
    info.status = "editName";
});

bot.callbackQuery("age", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новый возраст.");
    info.status = "editAge";
});

bot.callbackQuery("time", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новое время встречи в таком формате: чч:мм");
    info.status = "editTime";
});

bot.callbackQuery("hobby", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Введите новые увлечения.");
    info.status = "editHobby";
});

bot.callbackQuery("coffeeshop", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Укажите новую кофейню из предложенного списка.", { reply_markup: coffeeshops });
});

bot.callbackQuery("zhuk21", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.coffeeshop = "SKRTV, ул. Жукова 21";
    if (info.time==""){
        ctx.reply("Напишите удобное время для встречи в таком формате: чч:мм");
        info.status="createTime";
    } else{
        await ctx.reply("Кофейня была изменена.");
    }
});

bot.callbackQuery("pm8", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.coffeeshop = "SKRTV, ул. Проспект Мира 8";
    if (info.time==""){
        ctx.reply("Напишите удобное время для встречи в таком формате: чч:мм");
        info.status="createTime";
    } else{
        await ctx.reply("Кофейня была изменена.");
    }
});

bot.callbackQuery("ent47", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.coffeeshop = "SKRTV, ул. Энтузиастов 47";
    if (info.time==""){
        ctx.reply("Напишите удобное время для встречи в таком формате: чч:мм");
        info.status="createTime";
    } else{
        await ctx.reply("Кофейня была изменена.");
    }
});

bot.callbackQuery("zve13", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.coffeeshop = "SKRTV, ул. Звёздная 13";
    if (info.time==""){
        ctx.reply("Напишите удобное время для встречи в таком формате: чч:мм");
        info.status="createTime";
    } else{
        await ctx.reply("Кофейня была изменена.");
    }
});

bot.callbackQuery("nothing", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("🤔");
})

bot.callbackQuery("deleteprofile", async (ctx) => {
    if(info.id != 0) {
        await ctx.answerCallbackQuery();
        await ctx.deleteMessage();
        await ctx.reply("Вы уверены, что хотите удалить свою анкету?", { reply_markup: YesNo });
    } else {
        ctx.reply("⚠️У вас ещё не создана анкета⚠️");
    }
});

bot.command(
    "deleteprofile",
    (ctx) => {
        if (info.id != 0){
            ctx.reply("Вы уверены, что хотите удалить свою анкету?",{ reply_markup: YesNo });
        } else {
            ctx.reply("⚠️У вас ещё не создана анкета⚠️");
        }
    });

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

bot.callbackQuery("no", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Хорошо. Ваша анкета не была удалена.");
})

bot.callbackQuery("accept", async (ctx) =>{
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Отлично! Желаю отлично провести время!");
});

bot.callbackQuery("decline", async (ctx) =>{
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Жаль... Буду искать нового собеседника.");
});

bot.callbackQuery("man", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.gender = genderM(info.age);
    info.status = "createHobby&Coffeeshop";
    await ctx.reply("Хотелось бы узнать о ваших увлечениях, перечислите их.");

});

bot.callbackQuery("woman", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    info.gender = genderW(info.age);
    info.status = "createHobby&Coffeeshop"; 
    await ctx.reply("Хотелось бы узнать о ваших увлечениях, перечислите их.");
});

bot.on("message", async (ctx) =>{
    if (info.status) {
        switch (info.status) {

            case "createName":
                if (!ctx.msg.text || /[0-9!@#$%^&*()_+=-`~"№;:?<>{}]/.test(ctx.msg.text)){
                    ctx.reply("Пожалуйста, введите имя.");
                } else {                    
                    info.name = ctx.msg.text;
                    info.status = "createAge&Gender";
                    ctx.reply("Сколько вам лет?");
                }
                break;

            case "createAge&Gender":
                if (isNaN(Number(ctx.msg.text))){
                    ctx.reply("Введите возраст с помощью цифр.");
                } else { 
                    if (Number(ctx.msg.text) < 10 || Number(ctx.msg.text) > 80){
                        ctx.reply("Сомневаюсь, что вам столько, введите свой настоящий возраст🤭")
                    } else {
                        info.age = Number(ctx.msg.text);
                        ctx.reply("Укажите свой пол.", { reply_markup: gender });
                    }  
                }
                break;
            
            case "createHobby&Coffeeshop":
                if (ctx.msg.text){
                    info.hobby = ctx.msg.text.split(",");
                    ctx.reply("Выберите кофейню из предложенного списка.", { reply_markup: coffeeshops });
                }
                break;

            case "createTime":
                if (ctx.msg.text){
                    const checkTime = ctx.msg.text.split(":")
                    if (0<=Number(checkTime[0]) && Number(checkTime[0])<24 && 0<=Number(checkTime[1]) && Number(checkTime[1])<60 ){
                        info.time = ctx.msg.text;
                        info.status = "done";
                        info.id = ctx.msg.from.id;
                        await ctx.reply(JSON.stringify(users));
                        users = [info];
                        await ctx.reply("Отлично🤩\n" +
                            "Ваша анкета выглядит так:\n"+
                            "Привет!\n"+
                            `Меня зовут ${info.name}.\n`+ 
                            `Я ${info.gender.toLowerCase()}.\n`+ 
                            `Мне ${info.age}.\n`+
                            `Мои увлечения: ${info.hobby}.\n`+
                            `Кофейня, в которой хочу встретиться: ${info.coffeeshop}.\n`+
                            `Удобное время для встречи: ${info.time}.\n`);     
                        await ctx.reply(JSON.stringify(users));                
                    } else {
                        ctx.reply("Время должно существовать и быть в таком формате: чч:мм");
                    }
                };
                break;
            
            case "editName":
                if (!ctx.msg.text || /[0-9!@#$%^&*()_+=-`~"№;:?<>{}]/.test(ctx.msg.text)){
                    ctx.reply("Пожалуйста, введите имя.");
                } else {                    
                    info.name = ctx.msg.text;
                    info.status = "done";
                    ctx.reply("Ваше имя было изменено.");
                    await ctx.reply(JSON.stringify(users)); 
                };
                break;
            
            case "editAge":
                if (isNaN(Number(ctx.msg.text))){
                    ctx.reply("Введите возраст с помощью цифр.");
                } else { 
                    if (Number(ctx.msg.text) < 10 || Number(ctx.msg.text) > 80){
                        ctx.reply("Сомневаюсь, что вам столько, введите свой настоящий возраст🤭")
                    } else {
                        info.age = Number(ctx.msg.text);
                        if (["Девочка", "Девушка", "Женщина"].includes(info.gender)){
                            info.gender = genderW(info.age);
                        } 
                        if (["Мальчик", "Парень", "Мужчина"].includes(info.gender)) {
                            info.gender = genderM(info.age);
                        }
                        info.status = "done";
                        ctx.reply("Ваш возраст был изменён.");
                    }  
                }
                break;
            
            case "editHobby":
                if (ctx.msg.text){
                    info.hobby = ctx.msg.text.split(",");
                    info.status = "done";
                    ctx.reply("Ваше увлечения были изменены.");
                }
                    break;
                        
            case "editTime":
                if (ctx.msg.text){
                    const checkTime = ctx.msg.text.split(":")
                    if (0<=Number(checkTime[0]) && Number(checkTime[0])<24 && 0<=Number(checkTime[1]) && Number(checkTime[1])<60 ){
                        info.time = ctx.msg.text;
                        info.status = "done";
                        ctx.reply("Время для встречи было изменено.");
                    } else {
                        ctx.reply("Время должно существовать и быть в таком формате: чч:мм")
                    }
                }
                break;

            default:
                break;   
        }
    }
});
