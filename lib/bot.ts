import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");
interface UserInfo {
    id: number;
    name: string;
    gender: string;
    age: number;
    hobby: string[];
    area: string;
    time: string;
}

const info: UserInfo = {
    id: 0,
    name: "",
    gender: "",
    age: 0,
    hobby: [],
    area: "",
    time: ""
};

bot.command(
    "start",
    (ctx) => ctx.reply("Добро пожаловать👋"+
        "\nМеня зовут RandomCoffeeBot. Что я умею❓"+ 
        "\nЯ помогу найти тебе людей для интересного общения на общие темы. А встретиться вы сможете за чашечкой в любимой кофейне☕"), 
);

bot.command(
    "about",
    (ctx) => ctx.reply("Бот для поиска людей с схожими интересами, создан учениками 9 класса Лицея №54 и студентом кафедры ПМиФИ ОмГТУ во время 6 сезона проектной школы🏫"),
);

bot.command(
    "help",
    (ctx) => ctx.reply("Что я умею:"+
        "\n/about - краткая информация о боте"+
        "\n/createprofile - создание своей анкеты"+
        "\n/editprofile - изменение своей анкеты"+
        "\n/myprofile - просмотр своей анкеты"+
        "\n/command4 - описание4"+
        "\n/command5 - описание5")
);

bot.command(
    "createprofile", 
        (ctx) => ctx.reply("Давайте создадим анкету."),
);

bot.command(
    "editprofile",
    (ctx) => ctx.reply("Чтобы вы хотели изменить?", { reply_markup: edit })
)

bot.command(
    "myprofile",
    (ctx) => ctx.reply("")
)

const edit = new InlineKeyboard()
    .text("Имя", "/name")
    .text("\nВозраст", "/age")
    .text("\nРайон", "/area")
    .text("\nВремя встречия ", "/time")
    .text("\nУвлечения ", "/hobby")
    //.text("Любимая кофейня", "/coffeeshop")
    

bot.callbackQuery("/name", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Имя");
});

bot.callbackQuery("/name", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Возраст");
});

bot.callbackQuery("/area", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Ваш район");
});

bot.callbackQuery("/time", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Время встречи");
});

bot.callbackQuery("/hobby", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Ваши увлечения");
});

bot.callbackQuery("/coffeeshop", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply("Ваша любимая кофейня");
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
