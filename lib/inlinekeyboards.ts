import { InlineKeyboard } from "https://deno.land/x/grammy@v1.32.0/mod.ts";
export const edit = new InlineKeyboard()
    .row().text("Имя", "name").text("Возраст", "age")
    .row().text("Кофейня", "coffeeshop").text("Время встречи","time")
    .row().text("Увлечения", "hobby").text("Ничего", "nothing")
    .row().text("Удалить анкету", "deleteprofile");
    
export const YesNo = new InlineKeyboard()
    .text("Да✅", "yes")
    .text("Нет❌", "no")

export const gender = new InlineKeyboard()
    .text("Мужской👨‍💼", "man")
    .text("Женский👩‍💼", "woman")

export const decision = new InlineKeyboard()
    .text("Согласен👍", "accept")
    .text("Против👎", "decline")