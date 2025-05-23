import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            state.totalQuantity++;

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.total = existingItem.quantity * existingItem.price;
            }

            state.totalAmount = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item._id === id);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item._id !== id);
            } else {
                existingItem.quantity--;
                existingItem.total = existingItem.quantity * existingItem.price;
            }

            state.totalAmount = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 