import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    postData: null
}

const postSlice = createSlice({
    name: "postData",
    initialState: initialState,
    reducers: {
        addDataIn: (state, action)=>{
            state.postData = action.payload;
        },      
    }
});

export const {addDataIn} = postSlice.actions

export default postSlice.reducer;
