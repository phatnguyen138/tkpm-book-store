import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/hook";
import { AuthUser } from "../../types/User";


const initialState : {authUser: AuthUser} = {
    authUser: {
        id: "",
        name: "",
        img: "",
        email: "",
        phone: "",
        role: [],
        token: "invalid token",
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {            
            state.authUser = action.payload
        },
        userLoggedOut: (state) => {            
            state.authUser = initialState.authUser
        },
        userTokenRenewed: (state, action) => {
            state.authUser = action.payload
        },
        userProfileUpdated: (state, action) => {
            state.authUser = {...state.authUser, ...action.payload.updatedProfile}
        },
        userRoleUpdated: (state, action) => {
            state.authUser = {...state.authUser, ...action.payload.role}            
        }
    }
})

export function getAuthUser() {
    return useAppSelector(state => state.user.authUser)
}

export const {
    userLoggedIn,
    userLoggedOut,
    userTokenRenewed,
    userProfileUpdated,
    userRoleUpdated
} = userSlice.actions

export default userSlice.reducer