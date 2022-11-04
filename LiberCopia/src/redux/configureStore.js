import {configureStore} from '@reduxjs/toolkit'
import {authApi} from "./authenticator";
import {bookApi} from "./bookFetcher";
import editorReducer from "./editBookSlice"
import cartReducer from "./cartSlice"
import moreReducer from "./moreSlice"
import openmoreReducer from "./openmoreSlice"
import {orderApi} from "./orderApi";
import authReducer, {signIn} from "./authSlice"
import UserStorage from "../utils/storage/UserStorage";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [bookApi.reducerPath]: bookApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        editor: editorReducer,
        cart: cartReducer,
        openmore: openmoreReducer,
        more: moreReducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), authApi.middleware,
        bookApi.middleware, orderApi.middleware]

})

if (UserStorage.getUser()){
    store.dispatch(signIn());
}