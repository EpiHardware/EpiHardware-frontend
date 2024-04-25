import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingSpinner from "../compenents/common/LoadingSpinner";
import Layout from "../compenents/Layout";

interface ProductInCart {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
    photo: string;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<ProductInCart[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    let totalAmount = 0;  // Déclaration de totalAmount ici

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        axios.get('http://localhost:8000/api/carts', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                console.log('Cart items:', response.data);
                setCartItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            });
    };

    const removeItemFromCart = (productId: number) => {
        axios.delete(`http://localhost:8000/api/carts/${productId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                Swal.fire('Removed!', 'The product has been removed from your cart.', 'success');
                fetchCartItems();  // Re-fetch the cart items to update the UI
            })
            .catch(error => {
                Swal.fire('Error!', 'Failed to remove product from cart.', 'error');
            });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        console.log(`Updated quantity for product ID ${productId} to ${quantity}`);
    };

    if (loading) return <LoadingSpinner />;

    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
        totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    } else {
        console.log("No items in cart or cartItems is not an array");
    }

    return (
        <Layout>
        <div className="container mx-auto p-6 bg-white shadow-md">
            <h2 className="text-3xl font-bold text-center mb-8">Votre Panier :</h2>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4 p-4">
                    <div className="flex justify-between border-b pb-4">
                        <h3 className="text-xl font-semibold">Désignation</h3>
                        <h3 className="text-xl font-semibold">Prix</h3>
                        <h3 className="text-xl font-semibold">Quantité</h3>
                        <h3 className="text-xl font-semibold">Sous-total</h3>
                    </div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.product_id} className="flex justify-between items-center py-6 border-b">
                                <div className="flex items-center">
                                    <img src={item.photo} alt={item.name} className="h-16 mr-4" />
                                    <div>
                                        <p className="text-lg font-bold">{item.name}</p>
                                        <p className="text-sm">EN STOCK</p>
                                    </div>
                                </div>
                                <span className="text-lg">${item.price.toFixed(2)}</span>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
                                    className="border rounded p-2 text-center w-16"
                                />
                                <span className="text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    className="text-[30px] text-red-600 hover:text-red-800"
                                    onClick={() => removeItemFromCart(item.product_id)}
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="md:w-1/4 p-4 bg-blue-100 rounded-lg">
                    <div className="flex justify-between mb-6">
                        <span className="text-xl font-bold">Total TTC</span>
                        <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
                    </div>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded mb-4 w-full">
                        Passer Commande
                    </button>
                </div>
            </div>

        </div>
        </Layout>
    );
};

export default Cart;
