import Product from "../models/Product";

abstract class ProductMethods {
    public static async getAll(): Promise<Product[] | Error> {
        return await fetch('http://localhost:5432/products')
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data
            })
            .then(data => {
                return data.map((productData: any) => {
                    return new Product(
                        productData.id, productData.name, productData.description, productData.price, productData.photo)
                })
            })
            .catch((error) => {
                return error
            })
    }

    public static async get(id: number): Promise<Product | Error> {
        return await fetch(`http://localhost:5432/products/${id}`)
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data;
            })
            .then(data => {
                return new Product(data.id, data.name, data.description, data.price, data.photo)
            })
            .catch((error) => {
                return error
            });
    }

    public static async create(product: Product): Promise<Product | Error> {
        return await fetch('http://localhost:5432/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product.toJSON())
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data;
            })
            .catch((error) => {
                return error
            });
    }

    public static async update(product: Product): Promise<void> {
        await fetch(`http://localhost:5432/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product.toJSON())
            }
        )
    }

    public static async delete(product: Product): Promise<void> {
        await fetch(`http://localhost:5432/products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
    }
}

export default ProductMethods