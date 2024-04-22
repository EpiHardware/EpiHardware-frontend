import Order from "../models/Order";
import Product from "../models/Product";
import UserMethods from "./UserMethods";

abstract class OrderMethods {
    public static async getAll(): Promise<Order[] | Error> {
        return await fetch('http://localhost:5432/api/orders')
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

    public static async get(orderId: string): Promise<Order | Error> {
        return await fetch(`http://localhost:5432/api/orders/${orderId}`)
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
        return await fetch('http://localhost:5432/api/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserMethods.getToken()
            },
            body: JSON.stringify(order.toJSON())
        }).then(response => {
            let data: any = response.json()
            if (!response.ok) {
                throw new Error(data.message)
            }
        })
            .catch((error) => {
                return error
            });
    }

    public static async addToCart(product: Product): Promise<void | Error> {
        return await fetch(`http://localhost:5432/api/carts/${product.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserMethods.getToken()
            },
        }).then(response => {
            let data: any = response.json()
            if (!response.ok) {
                throw new Error(data.message)
            }
        })
            .catch((error) => {
                return error
            });
    }

    public static async removeFromCart(product: Product): Promise<void | Error> {
        return await fetch(`http://localhost:5432/api/carts/${product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserMethods.getToken()
            },
        }).then(response => {
            let data: any = response.json()
            if (!response.ok) {
                throw new Error(data.message)
            }
        })
            .catch((error) => {
                return error
            });
    }

    public static async getCart(): Promise<Product[] | Error> {
        return await fetch(`http://localhost:5432/api/carts/}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserMethods.getToken()
            },
        }).then(response => {
            let data: any = response.json()
            if (!response.ok) {
                throw new Error(data.message)
            }
            return data.map((productData: any) => {
                return Product.fromJSON(productData)
            })
        })
            .catch((error) => {
                return error
            });
    }
}

export default OrderMethods