import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

// Создайте экземпляр класса `Bot` и передайте ему токен вашего бота.
// Токен и адрес бэкенда мы спрячем, чтобы никто не смог воспользоваться нашим ботом или взломать нас. Получим их из файла .env (или из настроек в Deno Deploy)
export const bot = new Bot(Deno.env.get("BOT_TOKEN") || ""); // export нужен, чтобы воспользоваться ботом в другом файле

// Теперь вы можете зарегистрировать слушателей на объекте вашего бота `bot`.
// grammY будет вызывать слушателей, когда пользователи будут отправлять сообщения вашему боту.

// Обработайте команду /start.
bot.command(
    "start",
    (ctx) => ctx.reply("Добро пожаловать. Запущен и работает!",{ reply_markup: keyboard1 }),
);

// Клавиатура будет отправлять в бота команду /about
const keyboard1 = new InlineKeyboard()
    .text("Обо мне", "/about");

const keyboard2 = new InlineKeyboard()
    .text("Кнопка1", "/command1")
    .text("Кнопка2", "/command2")
    .text("Кнопка3", "/command3")
    .text("Кнопка4", "/command4")
    .text("Кнопка5", "/command5")

bot.callbackQuery("/about", async (ctx) => {
    await ctx.answerCallbackQuery(); // Уведомляем Telegram, что мы обработали запрос
    await ctx.reply("Бот для поиска людей с схожими интересами, создан учениками 8-11 классов и студентом кафедры ПМиФИ ОмГТУ во время 6 сезона проектной школы.",{reply_markup: keyboard2});
});

// Обработайте другие сообщения.
bot.on("message", (ctx) => ctx.reply("Получил ваше сообщение: " + ctx.message.text + "!",));

// Теперь, когда вы указали, как обрабатывать сообщения, вы можете запустить своего бота.
// Он подключится к серверам Telegram и будет ждать сообщений.
// Запуск бота производится из файла main.ts
