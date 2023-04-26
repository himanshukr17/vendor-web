import { configureStore } from "@reduxjs/toolkit";
import bucketReducer from '../Reducer/bucketSlice';

export const store = configureStore({
    reducer:{
        cart: bucketReducer,
    }
})