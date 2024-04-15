import Order from "../models/Order";
import User from "../models/User";

abstract class OrderMethods {
    public static async getAll(user: User, token: string): Promise<Order[] | Error> {
        //Todo Implement this method
    }

    public static async get(order: Order, user: User, token: string): Promise<Order | Error> {
        //todo Implement this method
    }

    public static async checkout(order: Order, user: User, token: string): Promise<Order | Error> {
        //Todo: Implement this method
    }
}

export default OrderMethods