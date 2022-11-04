import {createSlice} from "@reduxjs/toolkit"

const initialState = {}

const moreSlice = createSlice({
    name: "more",
    initialState,
    reducers: {
        addBookToMore(state, action) {
            const { book } = action.payload;
            state.value = {
                book: book,
                amount: state[book.id] ? state[book.id].amount + 1 : 1,
            }
        },
        removeBookFromMore(state, action) {
            const { book } = action.payload;
            state.value = {};
        },
    }
    // addBookToMore(state, action) {
    //     const { book } = action.payload;
    //     console.log(state.book)
    //     state.book = book
    // },
    // removeBookFromMore(state, action) {
    //     const { book } = action.payload;
    //     state.book = {}
    // },

})

export const {addBookToMore, removeBookFromMore} = moreSlice.actions;

export default moreSlice.reducer;