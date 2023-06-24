import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/hook";

interface UserState {
    email: string | null;
}

const initialState: UserState = {
    email: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.email = action.payload.email;
        },
        userLoggedOut: (state) => {
            state.email = null;
        },
    },
});

export function getAuthUser() {
    return useAppSelector((state) => state.user.email);
}

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
