import shopActionTypes from './shop.types'
export const updateCollection = (collectionMap) => ({
    type:shopActionTypes.UPDATE_COLLECTION,
    payload:collectionMap
})