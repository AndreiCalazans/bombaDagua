import { SET_RESULTS } from '../actions/types';


export default function resultsReducer( state = {} , action) {
    switch (action.type) {
        case SET_RESULTS:
            return { 
                ...state, 
                ...action.results
            }

    }
    return state;
}