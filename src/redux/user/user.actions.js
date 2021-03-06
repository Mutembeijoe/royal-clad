import { userActionTypes } from "./user.types";

export const googleSignInStart = () => ({
    type:userActionTypes.GOOGLE_SIGN_IN_START
})

export const emailSignInStart = (email, password) => ({
    type:userActionTypes.EMAIL_SIGN_IN_START,
    payload : {email, password}
})

export const signInSuccess =  user =>({
    type:userActionTypes.SIGN_IN_SUCCESS,
    payload:user
}) 

export const signInFailure =  error =>({
    type:userActionTypes.SIGN_IN_FAILURE,
    payload:error
}) 

export const getUserSession = ()=>({
    type:userActionTypes.GET_USER_SESSION
})

export const signOutStart = () => ({
    type:userActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type:userActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
    type:userActionTypes.SIGN_OUT_FAILURE,
    payload:error
})

export const signUpStart = (email,password,displayName) => ({
    type:userActionTypes.SIGN_UP_START,
    payload:{email,password,displayName}
})
export const signUpSuccess= (user,displayName) => ({
    type:userActionTypes.SIGN_UP_SUCCESS,
    payload:{user,displayName}
})
export const signUpFailure = (error) => ({
    type:userActionTypes.SIGN_UP_FAILURE,
    payload:error
})


