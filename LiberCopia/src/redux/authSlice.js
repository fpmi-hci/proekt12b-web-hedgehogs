import {createSlice} from "@reduxjs/toolkit"
import TokenStorage from "../utils/storage/TokenStorage";
import UserStorage from "../utils/storage/UserStorage";

const initialState = {isAuth: false};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn(state) {
            state.isAuth = true;
        },
        signOut(state) {
            state.isAuth = false;
            TokenStorage.removeToken();
            UserStorage.removeUser();
        },
    }
})

export const {signIn, signOut} = authSlice.actions

export default authSlice.reducer;