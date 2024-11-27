import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

// Создайте экземпляр класса `Bot` и передайте ему токен вашего бота.
// Токен и адрес бэкенда мы спрячем, чтобы никто не смог воспользоваться нашим ботом или взломать нас. Получим их из файла .env (или из настроек в Deno Deploy)
export const bot = new Bot(Deno.env.get("BOT_TOKEN") || ""); // export нужен, чтобы воспользоваться ботом в другом файле

// Теперь вы можете зарегистрировать слушателей на объекте вашего бота `bot`.
// grammY будет вызывать слушателей, когда пользователи будут отправлять сообщения вашему боту.

// Обработайте команду /start.
bot.command(
    "start",
    (ctx) => ctx.reply("Добро пожаловать. Я помогу найти вам интересного собеседника.", { reply_markup: keyboard1 }), 
);

bot.command(
    "about",
    (ctx) => ctx.reply("Бот для поиска людей с схожими интересами, создан учениками 8-11 классов и студентом кафедры ПМиФИ ОмГТУ во время 6 сезона проектной школы."),
);

bot.command(
    "help",
    (ctx) => ctx.reply("Что я умею:\n/about - краткая информация обо мне\n/command1 - описание1\n/command2 - описание2\n/command3 - описание3\n/command4 - описание4\n/command5 - описание5\n")
);
// Клавиатура будет отправлять в бота команду /about
const keyboard1 = new InlineKeyboard()
    .text("Кнопка1", "/command1")
    .text("Кнопка2", "/command2")
    .text("Кнопка3", "/command3")
    .text("Кнопка4", "/command4")
    .text("Кнопка5", "/command5")

bot.callbackQuery("/command1", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("1) Я просто существую и не несу полезной функции...");
});

bot.callbackQuery("/command2", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("2) Я просто существую и не несу полезной функции...");
});

bot.callbackQuery("/command3", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("3) Я просто существую и не несу полезной функции...");
});

bot.callbackQuery("/command4", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("4) Я просто существую и не несу полезной функции...");
});

bot.callbackQuery("/command5", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("5) Я просто существую и не несу полезной функции...");
});

// Обработайте другие сообщения.
bot.on("message", (ctx) => ctx.reply(""+ctx.message.text));

// Теперь, когда вы указали, как обрабатывать сообщения, вы можете запустить своего бота.
// Он подключится к серверам Telegram и будет ждать сообщений.
// Запуск бота производится из файла main.ts
