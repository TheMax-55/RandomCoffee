import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

// Создайте экземпляр класса `Bot` и передайте ему токен вашего бота.
// Токен и адрес бэкенда мы спрячем, чтобы никто не смог воспользоваться нашим ботом или взломать нас. Получим их из файла .env (или из настроек в Deno Deploy)
export const bot = new Bot(Deno.env.get("BOT_TOKEN") || ""); // export нужен, чтобы воспользоваться ботом в другом файле

// Теперь вы можете зарегистрировать слушателей на объекте вашего бота `bot`.
// grammY будет вызывать слушателей, когда пользователи будут отправлять сообщения вашему боту.

// Обработайте команду /start.
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
    (ctx) => ctx.reply("Что я умею:\n/about - краткая информация обо мне\n/command1 - описание1\n/command2 - описание2\n/command3 - описание3\n/command4 - описание4\n/command5 - описание5\n")
);

bot.command(
    "createprofile",
    (ctx) => ctx.reply("Расскажите о себе:"), 
);

bot.command(
    "editprofile",
    (ctx) => ctx.reply("Чтобы вы хотели изменить?", { reply_markup: edit })
)
// Клавиатура будет отправлять в бота команду /about
const edit = new InlineKeyboard()
    .text("Город", "/city")
    .text("Район", "/area")
    .text("Время встречия ", "/time")
    .text("Увлечения ", "/hobby")
    .text("Любимая кофейня", "/coffeeshop")

bot.callbackQuery("/city", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("Ваш город");
});

bot.callbackQuery("/area", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("Ваш район");
});

bot.callbackQuery("/time", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("Время встречи");
});

bot.callbackQuery("/hobby", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("Ваши увлечения");
});

bot.callbackQuery("/coffeeshop", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("Ваша любимая кофейня");
});

// Обработайте другие сообщения.
bot.on("message", (ctx) => ctx.reply(""+ctx.message.text));

// Теперь, когда вы указали, как обрабатывать сообщения, вы можете запустить своего бота.
// Он подключится к серверам Telegram и будет ждать сообщений.
// Запуск бота производится из файла main.ts
