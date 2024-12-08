export function genderW(age:number): string {
    if (age < 16){
        return "девочка";
    } else { 
        if (age > 30){
            return "женщина";
        }  else {
            return "девушка";
            } 
    } 
}

export function genderM(age:number): string {
    if (age < 16){
        return "мальчик";
    } else { 
        if (age > 30){
            return "мужчина";
        }  else {
            return "парень";
            } 
    } 
}