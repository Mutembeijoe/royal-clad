import shopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections:null,
    loading:false
}

const shopReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionTypes.FETCH_COLLECTION_START:
            return{
                ...state,
                loading:true
            }
        case shopActionTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                loading:false,
                collections:action.payload
            }
        case shopActionTypes.FETCH_COLLECTION_FAILURE:
            return {
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default shopReducer;