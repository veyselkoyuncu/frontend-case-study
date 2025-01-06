import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './cartSlice';
import productReducer from './productSlice';
import { cartMiddleware } from './cartMiddleware';

const preloadedCart = (): CartState => {
    if (typeof window !== "undefined" && window.localStorage) {
        const cart = localStorage.getItem("cart");
        return cart ? { items: JSON.parse(cart) } : { items: [] };
    }
    return { items: [] };
};

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
    },
    preloadedState: {
        cart: preloadedCart(),
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cartMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
