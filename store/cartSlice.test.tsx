import cartReducer, {
    addToCart,
    selectCartTotalQuantity,
    selectCartTotalPrice,
} from "@/store/cartSlice";

describe("cartSlice", () => {
    let initialState: any;

    beforeEach(() => {
        initialState = {
            cart: {
                items: [],
            },
            products: {
                products: [],
                filteredProducts: [],
                filters: {
                    search: "",
                    brand: [],
                    model: [],
                    sort: "priceLowToHigh",
                },
                brands: [],
                models: [],
                loading: false,
                error: null,
                currentPage: 1,
                itemsPerPage: 12,
                totalPages: 0,
            },
        };
    });

    it("should add an item to the cart", () => {
        const newItem = { id: "1", name: "Product 1", price: 100, quantity: 1 };
        const nextState = cartReducer(initialState.cart, addToCart(newItem));

        expect(nextState.items).toHaveLength(1);
        expect(nextState.items[0]).toEqual(newItem);
    });

    it("should increase the quantity if the item already exists in the cart", () => {
        initialState.cart.items = [{ id: "1", name: "Product 1", price: 100, quantity: 1 }];
        const nextState = cartReducer(
            initialState.cart,
            addToCart({ id: "1", name: "Product 1", price: 100, quantity: 2 })
        );

        expect(nextState.items).toHaveLength(1);
        expect(nextState.items[0].quantity).toBe(3);
    });

    it("should calculate the total price of items in the cart", () => {
        initialState.cart.items = [
            { id: "1", name: "Product 1", price: 100, quantity: 1 },
            { id: "2", name: "Product 2", price: 200, quantity: 2 },
        ];
        const totalPrice = selectCartTotalPrice(initialState);

        expect(totalPrice).toBe(500);
    });

    it("should calculate the total quantity of items in the cart", () => {
        initialState.cart.items = [
            { id: "1", name: "Product 1", price: 100, quantity: 1 },
            { id: "2", name: "Product 2", price: 200, quantity: 2 },
        ];
        const totalQuantity = selectCartTotalQuantity(initialState);

        expect(totalQuantity).toBe(3);
    });
});
