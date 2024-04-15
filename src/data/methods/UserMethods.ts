import User from "../models/User";

abstract class UserMethods {

    public static async register(
        login: string,
        email: string,
        firstname: string,
        lastname: string,
        password: string,
    ): Promise<void|Error> {
        //Todo: Implement the register method
    }

    public static async login(login: string, password: string): Promise<string|Error> {
        //Todo: Implement the login method
    }

    public static async update(user: User, token: string): Promise<void|Error> {
        //Todo: Implement the update method
    }

    public static async get(login: string, token: string): Promise<User|Error> {
        //todo Implement this method
    }

    public static getToken(): string|null {
        //todo Implement this method
    }

    public static addToken(token: string): void {
        //todo Implement this method
    }
}
export default UserMethods