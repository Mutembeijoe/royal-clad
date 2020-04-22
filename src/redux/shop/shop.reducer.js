import shopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections: [],
    loading:true
}

const shopReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionTypes.UPDATE_COLLECTION:
            return{
                ...state,
                collections: action.payload,
                loading:false
            }
        default:
            return state;
    }
}

export default shopReducer;