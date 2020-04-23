import {takeLatest, put, all, call} from 'redux-saga/effects';
import { userActionTypes } from './user.types';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess } from './user.actions';

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

export function* googleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignIn )
}

export function* emailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,emailSignIn )
}



export function* userSagas(){
    yield all([
        call(googleSignInStart),
        call(emailSignInStart)
    ])
}