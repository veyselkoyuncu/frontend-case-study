import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer, { addToCart } from "@/store/cartSlice";
import ProductDetailContent from "@/components/ProductDetail";
import { Product } from "@/interfaces/product";


jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
        <img src={src} alt={alt} />
    ),
}));

describe("ProductDetailContent Component", () => {
    const product: Product = {
        id: "1",
        name: "Test Product",
        price: 100.0,
        image: "https://example.com/product.jpg",
        description: "This is a test product.",
        model: "Test Model",
        brand: "Test Brand",
        createdAt: "2023-07-17T07:21:02.529Z",
    };

    const setupStore = () => {
        return configureStore({
            reducer: {
                cart: cartReducer,
            },
        });
    };

    it("renders product details correctly", () => {
        const store = setupStore();
        render(
            <Provider store={store}>
                <ProductDetailContent product={product} />
            </Provider>
        );


        expect(screen.getByText("Test Product")).toBeInTheDocument();


        expect(screen.getByText("₺100.00")).toBeInTheDocument();


        expect(
            screen.getByText("This is a test product.")
        ).toBeInTheDocument();


        const image = screen.getByAltText("Test Product");
        expect(image).toHaveAttribute("src", "https://example.com/product.jpg");
    });

    it("dispatches addToCart action when Add to Cart button is clicked", () => {
        const store = setupStore();
        const spyDispatch = jest.spyOn(store, "dispatch");

        render(
            <Provider store={store}>
                <ProductDetailContent product={product} />
            </Provider>
        );

        const addToCartButton = screen.getByRole("button", {
            name: /add to cart/i,
        });


        fireEvent.click(addToCartButton);


        expect(spyDispatch).toHaveBeenCalledWith(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            })
        );
    });
});
