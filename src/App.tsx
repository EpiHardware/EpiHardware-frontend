import React, {useEffect, useState} from 'react';
import './App.css';
import ProductMethods from "./data/methods/ProductMethods";
import Product from "./data/models/Product";

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<Error | null>();

    useEffect(() => {
        ProductMethods.getAll()
            .then((result) => {
                if (result instanceof Error) {
                    throw result;
                }
                setProducts(result);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    return (
        <div className="App">
            <p>mqlksdfjk</p>
            <ul>
                {error ? <li>{error.message}</li> : products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
