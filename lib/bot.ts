import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

bot.command(
    "start",
    (ctx) => ctx.reply("Добро пожаловать. Я помогу найти вам интересного собеседника."), 
);

bot.command(
    "about",
    (ctx) => ctx.reply("Бот для поиска людей с схожими интересами, создан учениками 8-11 классов и студентом кафедры ПМиФИ ОмГТУ во время 6 сезона проектной школы.", { reply_markup: edit }),
);

bot.command(
    "help",
    (ctx) => ctx.reply("Что я умею:\n/about - краткая информация\n/createprofile - создание анкеты\n/editprofile - изменение анкеты\n/command3 - описание3\n/command4 - описание4\n/command5 - описание5\n")
);

bot.command(
    "createprofile", 
    async (ctx) => {
        await ctx.reply("Давайте создадим анкету. Для начала напишите свой район проживания");
        const city = ctx.message;
        await bot.on("message", (ctx) => ctx.reply("Теперь напишите удобное время встречи"));
        const time = ctx.message;
        await bot.on("message", (ctx) => ctx.reply("Теперь напишите свои увлечения"))
        const hobby = ctx.message;
        await bot.on("message", (ctx) => ctx.reply("Теперь напишите адрес своей любимой кофейни"));
        const coffeeshop = ctx.message;
        await bot.on("message", (ctx) => ctx.reply("Ваша анкета выглядит так, осталось только сохранить:", city));
});

bot.command(
    "editprofile",
    (ctx) => ctx.reply("Чтобы вы хотели изменить?", { reply_markup: edit })
)

const edit = new InlineKeyboard()
    .text("Район", "/area")
    .text("Время встречия ", "/time")
    .text("Увлечения ", "/hobby")
    .text("Любимая кофейня", "/coffeeshop")

bot.callbackQuery("/area", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Ваш район");
});

bot.callbackQuery("/time", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Время встречи");
});

bot.callbackQuery("/hobby", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Ваши увлечения");
});

bot.callbackQuery("/coffeeshop", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Ваша любимая кофейня");
});

bot.on("message", (ctx) => ctx.react("🫡"));
