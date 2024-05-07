import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        axios.get('https://localhost:8000/api/products', { headers })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const addProduct = async () => {
        await axios.post('https://localhost:8000/api/products', { name, description, photo, price, quantity });
        fetchProducts();
    };

    const deleteProduct = async (productId: number) => {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        await axios.delete(`https://localhost:8000/api/products/${productId}`, { headers });
        fetchProducts();
    };

    const updateProduct = async (productId: number) => {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        await axios.put(`https://localhost:8000/api/products/${productId}`, { name, description, photo, price, quantity }, { headers });
        fetchProducts();
    };
    return (
        <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mt-4 lg:mt-0">Admin Page</h1>
            <h2 className="text-xl font-semibold text-gray-600 mt-2">Add a new product</h2>
            <form onSubmit={addProduct} className="mt-4">
                <label className="block mb-2">
                    Name:
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}
                           placeholder="Name" className="border rounded p-2 ml-2 mt-1"/>
                </label>
                <label className="block mb-2">
                    Description:
                    <input type="text" name="description" value={description}
                           onChange={e => setDescription(e.target.value)} placeholder="Description"
                           className="border rounded p-2 ml-2 mt-1"/>
                </label>
                <label className="block mb-2">
                    Photo URL:
                    <input type="text" name="photo" value={photo} onChange={e => setPhoto(e.target.value)}
                           placeholder="Photo URL" className="border rounded p-2 ml-2 mt-1"/>
                </label>
                <label className="block mb-2">
                    Price:
                    <input type="number" name="price" value={price} onChange={e => setPrice(Number(e.target.value))}
                           placeholder="Price" className="border rounded p-2 ml-2 mt-1"/>
                </label>
                <label className="block mb-2">
                    Quantity:
                    <input type="number" name="quantity" value={quantity}
                           onChange={e => setQuantity(Number(e.target.value))} placeholder="Quantity"
                           className="border rounded p-2 ml-2 mt-1"/>
                </label>
                <button type="submit"
                        className="text-white bg-blue-500 hover:bg-blue-600 rounded px-5 py-2 transition ease-in-out duration-300 mt-4">Add
                    Product
                </button>
            </form>
            <h2 className="text-xl font-semibold text-gray-600 mt-4">Existing products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product: any) => (
                    <div key={product.id} className="mt-4">
                        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                        <p className="text-md text-gray-600">{product.description}</p>
                        <img src={product.photo} alt={product.name} className="w-64 h-64 object-cover mt-2"/>
                        <p className="text-lg text-blue-600 mt-2">${product.price.toFixed(2)}</p>
                        <p className="text-md text-gray-600">{product.quantity}</p>
                        <button onClick={() => deleteProduct(product.id)}
                                className="text-white bg-red-500 hover:bg-red-600 rounded px-5 py-2 transition ease-in-out duration-300 mt-4">Delete
                        </button>
                        <button onClick={() => updateProduct(product.id)}
                                className="text-white bg-yellow-500 hover:bg-yellow-600 rounded px-5 py-2 transition ease-in-out duration-300 mt-4 ml-4">Update
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;

