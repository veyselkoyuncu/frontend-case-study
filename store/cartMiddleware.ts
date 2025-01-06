import { Middleware } from '@reduxjs/toolkit';

export const cartMiddleware: Middleware = store => next => action => {
    const result = next(action);
    if (action.type.startsWith('cart/')) {
        const state = store.getState();
        localStorage.setItem('cart', JSON.stringify(state.cart.items));
    }
    return result;
};
