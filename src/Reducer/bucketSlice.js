import { createSlice } from "@reduxjs/toolkit";

const bucketSlice= createSlice({
    name:'Bucket',
    initialState:[],
    reducers:{
        addItem: (state, action) => {
            return action.payload;
          },
    }
})

export const {addItem} = bucketSlice.actions;

export default bucketSlice.reducer