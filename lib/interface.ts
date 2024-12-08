export interface UserInfo {
    id: number;
    name: string;
    gender: string;
    age: number;
    hobby: string[];
    coffeeshop: {
        latitude : number;
        longitude: number;
    };
    time: string;
    status : string;
}