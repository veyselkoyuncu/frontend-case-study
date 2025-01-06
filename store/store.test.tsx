import configureStore from 'redux-mock-store';
import cartReducer, { addToCart, CartState } from './cartSlice';
import productReducer from './productSlice';
import { cartMiddleware } from './cartMiddleware';
import store, { RootState } from './store';

describe('Redux Store', () => {
    const initialCartState: CartState = {
        items: [
            {
                id: '1',
                name: 'Sample Product',
                price: 100,
                quantity: 1,
            },
        ],
    };

    it('should initialize store with preloaded cart state', () => {

        const localStorageMock = (() => {
            let store: { [key: string]: string } = {};
            return {
                getItem: (key: string) => store[key] || null,
                setItem: (key: string, value: string) => (store[key] = value),
                clear: () => (store = {}),
            };
        })();

        Object.defineProperty(global, 'localStorage', {
            value: localStorageMock,
        });


        localStorage.setItem('cart', JSON.stringify(initialCartState.items));

        const preloadedStore = store.getState();
        expect(preloadedStore.cart.items).toEqual(initialCartState.items);
    });

    it('should dispatch an action and update cart state', () => {
        const initialState: RootState = store.getState();
        const cartItem = {
            id: '2',
            name: 'Another Product',
            price: 200,
            quantity: 1,
        };

        store.dispatch(addToCart(cartItem));
        const updatedState = store.getState();

        expect(updatedState.cart.items).toEqual([
            ...initialState.cart.items,
            cartItem,
        ]);
    });

    it('should trigger cartMiddleware and update localStorage', () => {
        localStorage.clear();

        const cartItem = {
            id: '3',
            name: 'New Product',
            price: 300,
            quantity: 2,
        };

        store.dispatch(addToCart(cartItem));

        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(storedCart).toContainEqual(cartItem);
    });
});
