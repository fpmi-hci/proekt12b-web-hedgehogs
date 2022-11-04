import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    book : {}
}

const editBookSlice = createSlice({
    name: 'editor',
    initialState,
    reducers:{
        saveToEdition(state, action){
            state.book = action.payload;
        },
        deleteFromEdition (state){
            state.book = {};
        },
    }
})

export const {saveToEdition, deleteFromEdition} = editBookSlice.actions;

export default editBookSlice.reducer;