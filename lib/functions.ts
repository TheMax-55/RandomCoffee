//Функции для измениния названия пола при определённом возрасте
export function genderW(age:number): string {
    if (age < 16){
        return "Девочка";
    } else { 
        if (age > 30){
            return "Женщина";
        }  else {
            return "Девушка";
            } 
    } 
}

export function genderM(age:number): string {
    if (age < 16){
        return "Мальчик";
    } else { 
        if (age > 30){
            return "Мужчина";
        }  else {
            return "Парень";
            } 
    } 
}