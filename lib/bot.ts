import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

bot.command(
    "start",
    (ctx) => ctx.reply("Добро пожаловать. Я помогу найти вам интересного собеседника."), 
);

bot.command(
    "about",
    (ctx) => ctx.reply("Бот для поиска людей с схожими интересами, создан учениками 8-11 классов и студентом кафедры ПМиФИ ОмГТУ во время 6 сезона проектной школы."),
);

bot.command(
    "help",
    (ctx) => ctx.reply("Что я умею:\n/about - краткая информация\n/createprofile - создание анкеты\n/editprofile - изменение анкеты\n/command3 - описание3\n/command4 - описание4\n/command5 - описание5\n")
);

bot.command(
    "createprofile",
    (ctx) => ctx.reply("Расскажите о себе:"), 
);

bot.command(
    "editprofile",
    (ctx) => ctx.reply("Чтобы вы хотели изменить?", { reply_markup: edit })
)

const edit = new InlineKeyboard()
    .text("Город", "/city")
    .text("Район", "/area")
    .text("Время встречия ", "/time")
    .text("Увлечения ", "/hobby")
    .text("Любимая кофейня", "/coffeeshop")

bot.callbackQuery("/city", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Ваш город");
});

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
