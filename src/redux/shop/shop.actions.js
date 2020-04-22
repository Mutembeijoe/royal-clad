import shopActionTypes from './shop.types'
import { firestore, convertCollectSnapshotToMap } from '../../firebase/firebase.utils'
export const updateCollection = (collectionMap) => ({
    type:shopActionTypes.UPDATE_COLLECTION,
    payload:collectionMap
})

export const fetchCollectionStart = ()=>({
    type:shopActionTypes.FETCH_COLLECTION_START,
})

export const fetchCollectionSuccess = collectionMap =>({
    type:shopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionFailure = errorMessage => ({
    type:shopActionTypes.FETCH_COLLECTION_FAILURE,
    payload:errorMessage
})

export const fetchCollectionAsync = () => {
    return dispatch => {
        const collectionRef =firestore.collection("collections")
        dispatch(fetchCollectionStart())

        collectionRef.get().then(snapshot => {
            const collectionMap = convertCollectSnapshotToMap(snapshot)
            dispatch(fetchCollectionSuccess(collectionMap))
        }).catch(error => dispatch(fetchCollectionFailure(error.message)))
    }
}
