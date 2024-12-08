import { InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";
//Клавиатура для изменения профиля 
export const edit = new InlineKeyboard()
    .row().text("Имя", "name").text("Возраст", "age")
    .row().text("Кофейня", "coffeeshop").text("Время встречи","time")
    .row().text("Увлечения", "hobby").text("Ничего", "nothing")
    .row().text("Удалить анкету", "deleteprofile");

//Клавиатура для удаления профиля
export const YesNo = new InlineKeyboard()
    .text("Да✅", "yes")
    .text("Нет❌", "no")

//Клавиатура для выбора пола
export const gender = new InlineKeyboard()
    .text("Мужской👨‍💼", "man")
    .text("Женский👩‍💼", "woman")

//Клавиатура для согласия/отказа возможной встречи(поиск встреч реализован не был...)
export const decision = new InlineKeyboard()
    .text("Согласен👍", "accept")
    .text("Против👎", "decline")