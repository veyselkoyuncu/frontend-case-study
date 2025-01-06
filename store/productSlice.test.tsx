import productReducer, {
    setSearch,
    setBrandFilter,
    setModelFilter,
    setSort,
    setCurrentPage,
    applyFilters,
    fetchProducts,
    ProductState,
} from "@/store/productSlice";
import { Product } from "@/interfaces/product";

const mockProducts: Product[] = [
    {
        id: "1",
        name: "Bentley Focus",
        price: 51.0,
        image: "https://loremflickr.com/640/480/food",
        description: "Description 1",
        model: "CTS",
        brand: "Lamborghini",
        createdAt: "2023-07-17T07:21:02.529Z",
    },
    {
        id: "2",
        name: "Aston Martin Durango",
        price: 374.0,
        image: "https://loremflickr.com/640/480/food",
        description: "Description 2",
        model: "Roadster",
        brand: "Smart",
        createdAt: "2023-07-17T02:49:46.692Z",
    },
    {
        id: "3",
        name: "Ford XC90",
        price: 735.0,
        image: "https://loremflickr.com/640/480/city",
        description: "Description 3",
        model: "Taurus",
        brand: "Ferrari",
        createdAt: "2023-07-16T08:46:46.400Z",
    },
];

const initialState: ProductState = {
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
};

describe("productSlice", () => {
    it("should return the initial state", () => {
        expect(productReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it("should handle setSearch", () => {
        const state = productReducer(initialState, setSearch("Bentley"));
        expect(state.filters.search).toEqual("Bentley");
    });

    it("should handle setBrandFilter", () => {
        const state = productReducer(initialState, setBrandFilter(["Lamborghini"]));
        expect(state.filters.brand).toEqual(["Lamborghini"]);
    });

    it("should handle setModelFilter", () => {
        const state = productReducer(initialState, setModelFilter(["CTS"]));
        expect(state.filters.model).toEqual(["CTS"]);
    });

    it("should handle setSort", () => {
        const state = productReducer(initialState, setSort("priceHighToLow"));
        expect(state.filters.sort).toEqual("priceHighToLow");
    });

    it("should handle setCurrentPage", () => {
        const stateWithProducts = {
            ...initialState,
            products: mockProducts,
            filteredProducts: mockProducts,
        };

        const state = productReducer(stateWithProducts, setCurrentPage(2));
        expect(state.currentPage).toEqual(2);
    });

    it("should handle applyFilters", () => {
        const stateWithProducts = {
            ...initialState,
            products: mockProducts,
        };

        const state = productReducer(stateWithProducts, applyFilters());
        expect(state.filteredProducts).toEqual(mockProducts.slice(0, 12));
        expect(state.totalPages).toEqual(1);
    });

    it("should handle fetchProducts.pending", () => {
        const action = { type: fetchProducts.pending.type };
        const state = productReducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it("should handle fetchProducts.fulfilled", () => {
        const action = { type: fetchProducts.fulfilled.type, payload: mockProducts };
        const state = productReducer(initialState, action);

        expect(state.products).toEqual(mockProducts);
        expect(state.filteredProducts).toEqual(mockProducts.slice(0, 12));
        expect(state.brands).toEqual(["Lamborghini", "Smart", "Ferrari"]);
        expect(state.models).toEqual(["CTS", "Roadster", "Taurus"]);
        expect(state.loading).toBe(false);
    });

    it("should handle fetchProducts.rejected", () => {
        const action = {
            type: fetchProducts.rejected.type,
            error: { message: "Failed to fetch products" },
        };

        const state = productReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe("Failed to fetch products");
    });
});
