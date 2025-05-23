import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ searchTerm = '', category = '' }) => {
        const response = await axios.get(`http://localhost:5000/api/products?search=${searchTerm}&category=${category}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        filteredProducts: [],
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {
        filterByCategory: (state, action) => {
            const category = action.payload;
            if (category === '') {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    product => product.category === category
                );
            }
        },
        searchProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            if (searchTerm === '') {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload;
                state.categories = [...new Set(action.payload.map(product => product.category))];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { filterByCategory, searchProducts } = productSlice.actions;
export default productSlice.reducer; 