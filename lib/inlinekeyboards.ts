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

//Клавиатура для выбора кофейни, которую хотели бы увидеть представители Effective(тестовый вариант, адреса ненастоящие). Будут добавлены новые адреса и возможность листать страницы с адресами 
export const coffeeshops = new InlineKeyboard()
    .row().text("SKRTV, ул. Жукова 21","zhuk21")
    .row().text("SKRTV, ул. Проспект Мира 8", "pm8")
    .row().text("SKRTV, ул. Энтузиастов 47", "ent47")
    .row().text("SKRTV, ул. Звёздная 13", "zve13")
    .row().text("Ничего", "nothing")
//Клавиатура для согласия/отказа возможной встречи(не реализовано)
// export const decision = new InlineKeyboard()
//     .text("Согласен👍", "accept")
//     .text("Против👎", "decline")