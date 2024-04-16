import Order from "../models/Order";
import Product from "../models/Product";

abstract class OrderMethods {
    public static async getAll(): Promise<Order[] | Error> {
        return await fetch('http://localhost:5432/orders')
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data
            })
            .then(data => {
                return data.map((orderData: any) => {
                    let products = orderData.products.map((productData: any) => {
                        return new Product(
                            productData.id,
                            productData.name,
                            productData.description,
                            productData.price,
                            productData.photo)
                    })
                    return new Order(orderData.id, orderData.totalPrice, orderData.creationDate, products)
                })
            })
            .catch((error) => error)
    }

    public static async get(id: string): Promise<Order | Error> {
        return await fetch(`http://localhost:5432/orders/${id}`)
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data;
            })
            .then(orderData => {
                let products = orderData.products.map((productData: any) => {
                    return new Product(
                        productData.id,
                        productData.name,
                        productData.description,
                        productData.price,
                        productData.photo)
                })
                return new Order(orderData.id, orderData.totalPrice, orderData.creationDate, products)
            })
            .catch((error) => {
                return error
            });
    }

    public static async checkout(order: Order): Promise<void> {
        await fetch('http://localhost:5432/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order.toJSON())
        })
    }

    public static addToCart(product: Product): void {
        //todo Implement this method
    }

    public static removeFromCart(product: Product): void {
        //todo Implement this method
    }

    public static clearCart(): void {
        //todo Implement this method
    }

    public static getCart(): Product[] | Error {
        return Error("Not Implemented")
        //todo Implement this method
    }
}

export default OrderMethods