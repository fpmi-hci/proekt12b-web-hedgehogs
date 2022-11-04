import {createSlice} from "@reduxjs/toolkit"

const initialState = {}

const openmoreSlice = createSlice({
    name: "openmoreSlice",
    initialState,
    reducers: {
        openMore(state, action) {
            state.open = true
        },
        closeMore(state, action) {
            state.open = false
        },
    }

})

export const {closeMore, openMore} = openmoreSlice.actions;

export default openmoreSlice.reducer;