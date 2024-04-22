import React from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    amount: number;
    brandName: string;
    selectedSize: string;
}

interface CartState {
    cart: {
        cartItems: CartItem[];
    };
}

const CartItemsList: React.FC = () => {
    const { cartItems } = useSelector((state: RootState) => state.cart);

    return (
        <>
            {cartItems.map((item) => {
                return <CartItem key={item.id} cartItem={item} />;
            })}
        </>
    );
};

export default CartItemsList;
