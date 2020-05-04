import User from "../../models/User";
import USER_ACTIONS from "../actions/userActionsConstants";

const initialState = {
    user: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type){
        case USER_ACTIONS.LOGIN_START:
        case USER_ACTIONS.GET_MAGAZINES_START:
            return {
                ...state,
                loading: true
            };
        case USER_ACTIONS.LOGIN_FAILED:
            console.log('Test');
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case USER_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: new User({
                    ...action.payload
                })
            }
        case USER_ACTIONS.LOGOUT:
            return {
                ...state,
                loading: true,
                user: null
            }
        case USER_ACTIONS.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case USER_ACTIONS.GET_MAGAZINES_SUCCESS:
            return {
                ...state,
                loading: false,
                table: action.payload
            }
        case USER_ACTIONS.GET_MAGAZINES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}