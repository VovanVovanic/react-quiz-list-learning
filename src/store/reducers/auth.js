import { ON_ERROR, ON_SESSION_EXPIRED, ON_TOKEN_SET, } from "../actions/action-type"

const initialState = {
    token: null,
    error: ''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case ON_ERROR: 
            return {
                ...state, error: action.error
            }
        case ON_TOKEN_SET:
            return {
                ...state, token: action.token
            }
        case ON_SESSION_EXPIRED:
            return {
                ...state, token:null
            }
        default: return state
    }
}