import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        updateCartQuantity(state, action: PayloadAction<{ id: string; quantityChange: number }>) {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantityChange;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(cartItem => cartItem.id !== action.payload.id);
                }
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const { addToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
