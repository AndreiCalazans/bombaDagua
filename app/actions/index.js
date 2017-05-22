import axios from 'axios';
import history from '../history';
import { SET_RESULTS} from './types';


const ROOT_URL = 'http://localhost:3000';

export function setResults(results) {
    return {
        type: SET_RESULTS,
        results
    }
}