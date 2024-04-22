import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Import the type of your root state

interface CartState {
  cart: {
    amount: number;
    total: number;
  };
}

const CartTotals: React.FC = () => {
  const { amount, total } = useSelector((state: RootState) => state.cart);
  const tax = total / 5;
  const shipping = 50;
  return (
      <div className='card bg-base-200'>
        <div className='card-body'>
          {/* SUBTOTAL */}
          <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
            <span>Subtotal</span>
            <span className='font-medium'>${ Math.round(total) }</span>
          </p>
          {/* SHIPPING */}
          <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
            <span>Shipping</span>
            <span className='font-medium'>${ shipping }</span>
          </p>
          {/* Tax */}
          <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
            <span>Tax 20%</span>
            <span className='font-medium'>${Math.round(tax)}</span>
          </p>
          {/* Order Total */}
          <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
            <span>Order Total</span>
            <span className='font-medium'>${ Math.round(total + shipping + tax) }</span>
          </p>
        </div>
      </div>
  )
}

export default CartTotals;
