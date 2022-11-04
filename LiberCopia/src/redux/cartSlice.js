import {createSlice} from "@reduxjs/toolkit"

const initialState = {}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBookToCard(state, action) {
            const { book } = action.payload;
            console.log(book)
           state[book.id] = {
                ...state[book.id],
                book: book,
                amount: state[book.id] ? state[book.id].amount + 1 : 1,
            }
        },
        removeBookFromCart(state, action) {
            const { book } = action.payload;
            delete state[book.id];
        },
        increaseBookAmount(state, action){
            state[action.payload] = {
                ...state[action.payload],
                amount: state[action.payload].amount + 1
            }
        },
        decreaseBookAmount(state, action){
            state[action.payload] = {
                ...state[action.payload],
                amount: state[action.payload].amount - 1
            }
        },
    }

})

export const {addBookToCard, removeBookFromCart, increaseBookAmount, decreaseBookAmount} = cartSlice.actions;

export default cartSlice.reducer;