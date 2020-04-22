// import SHOP_DATA from './shop_data';
import shopActionTypes from './shop.types';
import SHOP_DATA from './shop_data';

const INITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionTypes.UPDATE_COLLECTION:
            return{
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;