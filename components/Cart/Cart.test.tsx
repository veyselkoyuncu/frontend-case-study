import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlice";
import Cart from "@/components/Cart";

const initialCartState = {
    items: [
        { id: "1", name: "Sample Product 1", price: 100, quantity: 2 },
        { id: "2", name: "Sample Product 2", price: 200, quantity: 1 },
    ],
};


const setupStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState: {
            cart: { ...initialCartState, ...preloadedState },
        },
    });
};

describe("Cart Component", () => {
    it("renders with headers and items when cart is not empty", () => {
        const store = setupStore();
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );


        expect(screen.getByText("Cart")).toBeInTheDocument();
        expect(screen.getByText("Checkout")).toBeInTheDocument();


        expect(screen.getByText("Sample Product 1")).toBeInTheDocument();
        expect(screen.getByText("Sample Product 2")).toBeInTheDocument();
        expect(screen.getByText("100 ₺")).toBeInTheDocument();
        expect(screen.getByText("200 ₺")).toBeInTheDocument();


        expect(screen.getByText("400 ₺")).toBeInTheDocument();
    });

    it("hides headers when hideHeaders prop is true", () => {
        const store = setupStore();
        render(
            <Provider store={store}>
                <Cart hideHeaders={true} />
            </Provider>
        );


        expect(screen.queryByText("Cart")).not.toBeInTheDocument();
        expect(screen.queryByText("Checkout")).not.toBeInTheDocument();


        expect(screen.getByText("Sample Product 1")).toBeInTheDocument();
        expect(screen.getByText("Sample Product 2")).toBeInTheDocument();
    });

    it("shows 'Your cart is empty' when cart is empty", () => {
        const store = setupStore({ items: [] });
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );


        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("disables the checkout button when cart is empty", () => {
        const store = setupStore({ items: [] });
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );


        const checkoutButton = screen.getByText("Checkout");
        expect(checkoutButton).toBeDisabled();
    });

    it("increases and decreases item quantity", () => {
        const store = setupStore();
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        const increaseButtons = screen.getAllByText("+");
        const decreaseButtons = screen.getAllByText("-");


        fireEvent.click(increaseButtons[0]);
        expect(store.getState().cart.items[0].quantity).toBe(3);


        fireEvent.click(decreaseButtons[1]);
        expect(store.getState().cart.items[1].quantity).toBe(0);
    });
});
