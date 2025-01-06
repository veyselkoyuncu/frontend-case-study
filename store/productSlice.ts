import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { Product } from '@/interfaces/product';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://5fc9346b2af77700165ae514.mockapi.io/products');
    const data: Product[] = await response.json();
    return data;
});

interface FilterState {
    search: string;
    brand: string[];
    model: string[];
    sort: 'oldToNew' | 'newToOld' | 'priceLowToHigh' | 'priceHighToLow';
}

export interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    filters: FilterState;
    brands: string[];
    models: string[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}


const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    filters: {
        search: '',
        brand: [],
        model: [],
        sort: 'priceLowToHigh',
    },
    brands: [],
    models: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 0,
};


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.filters.search = action.payload;
        },
        setBrandFilter(state, action: PayloadAction<string[]>) {
            state.filters.brand = action.payload;
        },
        setModelFilter(state, action: PayloadAction<string[]>) {
            state.filters.model = action.payload;
        },
        setSort(state, action: PayloadAction<'oldToNew' | 'newToOld' | 'priceLowToHigh' | 'priceHighToLow'>) {
            state.filters.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;

            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = startIndex + state.itemsPerPage;
            state.filteredProducts = state.products
                .filter(product => {
                    if (state.filters.search && !product.name.toLowerCase().includes(state.filters.search.toLowerCase())) {
                        return false;
                    }
                    if (state.filters.brand.length > 0 && !state.filters.brand.includes(product.brand)) {
                        return false;
                    }
                    if (state.filters.model.length > 0 && !state.filters.model.includes(product.model)) {
                        return false;
                    }
                    return true;
                })
                .slice(startIndex, endIndex);
        },
        applyFilters(state) {
            const { products, filters } = state;

            let filtered = products;

            if (filters.search) {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(filters.search.toLowerCase())
                );
            }

            if (filters.brand.length > 0) {
                filtered = filtered.filter(product => filters.brand.includes(product.brand));
            }

            if (filters.model.length > 0) {
                filtered = filtered.filter(product => filters.model.includes(product.model));
            }

            if (filters.sort === 'priceLowToHigh') {
                filtered = filtered.sort((a, b) => a.price - b.price);
            } else if (filters.sort === 'priceHighToLow') {
                filtered = filtered.sort((a, b) => b.price - a.price);
            } else if (filters.sort === 'oldToNew') {
                filtered = filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            } else if (filters.sort === 'newToOld') {
                filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }

            state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);

            if (state.currentPage > state.totalPages) {
                state.currentPage = state.totalPages || 1;
            }

            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = startIndex + state.itemsPerPage;
            state.filteredProducts = filtered.slice(startIndex, endIndex);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload.slice(0, state.itemsPerPage);
                state.brands = Array.from(new Set(action.payload.map(product => product.brand)));
                state.models = Array.from(new Set(action.payload.map(product => product.model)));
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ürünler yüklenirken bir hata oluştu.';
            });
    },
});

export const {
    setSearch,
    setBrandFilter,
    setModelFilter,
    setSort,
    setCurrentPage,
    applyFilters,
} = productSlice.actions;

export const selectFilteredProducts = (state: RootState) => state.products.filteredProducts;
export const selectBrands = (state: RootState) => state.products.brands;
export const selectModels = (state: RootState) => state.products.models;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectTotalPages = (state: RootState) => state.products.totalPages;
export const selectTotalProducts = (state: RootState) => state.products.products.length;
export const selectFilteredProductsCount = (state: RootState) => state.products.filteredProducts.length;



export default productSlice.reducer;
