import {takeLatest, put, all, call} from 'redux-saga/effects';
import { userActionTypes } from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpSuccess, signUpFailure} from './user.actions';

function* getSnapShotFromUserAuth(userAuth, additionalInfo){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalInfo)
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

function* signUpUser({payload:{email, password, displayName}}){
    try {
        const {user}=  yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess(user, displayName))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

function* signInAfterSignUp({payload:{user, displayName}}){
    try {
        yield getSnapShotFromUserAuth(user,{displayName})
    } catch (error) {
        yield signUpFailure(error)
    }
}

/*
***** Listeners  START HERE *****
*/

function* onGoogleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignIn )
}

function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,emailSignIn )
}

function* onGetUserSession(){
    yield takeLatest(userActionTypes.GET_USER_SESSION, isUserAuthenticated )
}

function* onSignOut(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOutUser)
}

function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, signUpUser)
}

function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onGetUserSession),
        call(onSignOut),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}