import {takeLatest, put, all, call} from 'redux-saga/effects';
import { userActionTypes } from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess } from './user.actions';

function* getSnapShotFromUserAuth(userAuth){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* emailSignIn({payload:{email, password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}


function* googleSignIn(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser()
        if(!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* signOutUser(){
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
       yield put(signOutFailure(error)) 
    }
}

export function* googleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignIn )
}

export function* emailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,emailSignIn )
}

export function* onGetUserSession(){
    yield takeLatest(userActionTypes.GET_USER_SESSION, isUserAuthenticated )
}

export function* onSignOut(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOutUser)
}


export function* userSagas(){
    yield all([
        call(googleSignInStart),
        call(emailSignInStart),
        call(onGetUserSession),
        call(onSignOut)
    ])
}