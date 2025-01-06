import configureMockStore from 'redux-mock-store';
import { cartMiddleware } from '@/store/cartMiddleware';
import { addToCart, removeFromCart } from '@/store/cartSlice';

describe('cartMiddleware', () => {
    const mockStore = configureMockStore([cartMiddleware]);

    beforeEach(() => {
        localStorage.clear();
    });

    it('Cart action dispatch edildiğinde localStorage güncellenmeli', () => {
        const store = mockStore({
            cart: {
                items: [
                    { id: '1', name: 'Ürün 1', price: 100, quantity: 1 },
                ],
            },
        });


        store.dispatch(addToCart({ id: '2', name: 'Ürün 2', price: 200, quantity: 1 }));

        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(savedCart).toEqual([
            { id: '1', name: 'Ürün 1', price: 100, quantity: 1 },
            { id: '2', name: 'Ürün 2', price: 200, quantity: 1 },
        ]);
    });

    it('Bir ürün sepetten silindiğinde localStorage güncellenmeli', () => {
        const store = mockStore({
            cart: {
                items: [
                    { id: '1', name: 'Ürün 1', price: 100, quantity: 1 },
                    { id: '2', name: 'Ürün 2', price: 200, quantity: 1 },
                ],
            },
        });


        store.dispatch(removeFromCart('1'));


        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(savedCart).toEqual([
            { id: '2', name: 'Ürün 2', price: 200, quantity: 1 },
        ]);
    });

    it('cart dışındaki actionlar localStorage ile ilgili bir işlem yapmamalı', () => {
        const store = mockStore({
            cart: {
                items: [{ id: '1', name: 'Ürün 1', price: 100, quantity: 1 }],
            },
        });


        store.dispatch({ type: 'someOtherSlice/someAction' });

        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        expect(savedCart).toEqual([]);
    });
});
