import shopActionTypes from './shop.types'

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
