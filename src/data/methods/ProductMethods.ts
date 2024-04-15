import Product from "../models/Product";

abstract class ProductMethods {
    public static async getAll(): Promise<Product[] | Error> {
        return await fetch('http://localhost:3000/products') // Todo: update the URL of this fetch request
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
}

export default ProductMethods