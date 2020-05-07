import User from "../../models/User";
import USER_ACTIONS from "../actions/userActionsConstants";
import ERROR from "../actions/errorConstants";

const initialState = {
    user: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type){
        case USER_ACTIONS.LOGIN_START:
        case USER_ACTIONS.GET_MAGAZINES_START:
        case USER_ACTIONS.GET_POSITIONS_START:
        case USER_ACTIONS.GET_TRANSTYPES_START:
        case USER_ACTIONS.GET_ORDERTYPES_START:
        case USER_ACTIONS.GET_MAGAZINETYPES_START:
        case USER_ACTIONS.GET_DISTRICTS_START:
        case USER_ACTIONS.GET_BLOCKS_START:
        case USER_ACTIONS.GET_CLIENTS_START:
        case USER_ACTIONS.GET_TRANSACTIONS_START:
        case USER_ACTIONS.GET_PENSIONS_START:
        case USER_ACTIONS.GET_SUBSCRIPTIONS_START:
        case USER_ACTIONS.GET_ORDERS_START:
        case USER_ACTIONS.GET_WORKERS_START:
            return {
                ...state,
                loading: true
            };
        case USER_ACTIONS.LOGIN_FAILED:
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
                user: undefined
            }
        case USER_ACTIONS.LOGOUT_SUCCESS:
        case USER_ACTIONS.GET_MAGAZINES_SUCCESS:
        case USER_ACTIONS.GET_POSITIONS_SUCCESS:
        case USER_ACTIONS.GET_TRANSTYPES_SUCCESS:
        case USER_ACTIONS.GET_ORDERTYPES_SUCCESS:
        case USER_ACTIONS.GET_MAGAZINETYPES_SUCCESS:
        case USER_ACTIONS.GET_DISTRICTS_SUCCESS:
        case USER_ACTIONS.GET_BLOCKS_SUCCESS:
        case USER_ACTIONS.GET_CLIENTS_SUCCESS:
        case USER_ACTIONS.GET_TRANSACTIONS_SUCCESS:
        case USER_ACTIONS.GET_PENSIONS_SUCCESS:
        case USER_ACTIONS.GET_SUBSCRIPTIONS_SUCCESS:
        case USER_ACTIONS.GET_ORDERS_SUCCESS:
        case USER_ACTIONS.GET_WORKERS_SUCCESS:
            return {
                ...state,
                loading: false,
                table: action.payload
            }
        case USER_ACTIONS.GET_MAGAZINES_FAILED:
        case USER_ACTIONS.GET_POSITIONS_FAILED:
        case USER_ACTIONS.GET_TRANSTYPES_FAILED:
        case USER_ACTIONS.GET_ORDERTYPES_FAILED:
        case USER_ACTIONS.GET_MAGAZINETYPES_FAILED:
        case USER_ACTIONS.GET_DISTRICTS_FAILED:
        case USER_ACTIONS.GET_BLOCKS_FAILED:
        case USER_ACTIONS.GET_CLIENTS_FAILED:
        case USER_ACTIONS.GET_TRANSACTIONS_FAILED:
        case USER_ACTIONS.GET_PENSIONS_FAILED:
        case USER_ACTIONS.GET_SUBSCRIPTIONS_FAILED:
        case USER_ACTIONS.GET_ORDERS_FAILED:
        case USER_ACTIONS.GET_WORKERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ERROR.ERROR_OFF: {
            return {
                ...state,
                error: undefined
            }
        }
        default:
            return state;
    }
}