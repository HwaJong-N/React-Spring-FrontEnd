import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeCartItem, getAllCartItems } from "../api/cartApi";

// createAsyncThunk 로 작성하게 되면 extraReducer 를 통해 처리
export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getAllCartItems();
});


export const postChangeCartItemAsync = createAsyncThunk('postChangeCartItemAsync', (cartItem) => {
    return changeCartItem(cartItem);
});


const initState = [];


const cartSlice = createSlice({
    name: 'cartSlice',
    initialState : initState,
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                console.log("getCartItemsAsync fulfilled action = ", action);
                return action.payload;
            })
            .addCase(postChangeCartItemAsync.fulfilled, (state, action) => {
                console.log("postChangeCartItemAsync fulfilled action = ", action);
                return action.payload;
            })
    }
})


export default cartSlice.reducer;