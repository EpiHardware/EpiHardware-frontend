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
        let cart = OrderMethods.getCart()
        cart.push(product)
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    public static removeFromCart(product: Product): void {
        let cart = this.getCart()
        for (let i = 0; i < cart.length; ++i) {
            if (cart[i].id === product.id) {
                cart.splice(i, 1)
                break
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    public static clearCart(): void {
        localStorage.setItem("cart", JSON.stringify([]))
    }

    public static getCart(): Product[] {
        let cart = localStorage.getItem("cart")
        if (cart === null) {
            return []
        }
        return JSON.parse(cart).map((product: any) => {
            return new Product(
                product.id,
                product.name,
                product.description,
                product.price,
                product.photo);
        })
    }
}

export default OrderMethods