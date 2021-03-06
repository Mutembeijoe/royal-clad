import {takeLatest, call, put, all } from 'redux-saga/effects';
import shopActionTypes from './shop.types';
import { firestore, convertCollectSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';


function* fetchCollectionAsync(){
    try {
        const collectionRef =firestore.collection("collections")
        const snapshot = yield collectionRef.get()
        const collectionMap = yield call(convertCollectSnapshotToMap, snapshot)
        yield put(fetchCollectionSuccess(collectionMap))
    } catch (error) {
        put(fetchCollectionFailure(error.message))
    }
}

function* fetchCollectionStart(){
   yield takeLatest(shopActionTypes.FETCH_COLLECTION_START, fetchCollectionAsync)
}

export function* shopSagas(){
    yield all([
        call(fetchCollectionStart)
    ])
}