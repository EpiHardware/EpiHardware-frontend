import { configureStore, Store } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import authReducer from './features/auth/authSlice';

const reducer = {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
};

export type RootState = ReturnType<typeof reducer>;

export const store: Store<RootState> = configureStore({
    reducer,
});
