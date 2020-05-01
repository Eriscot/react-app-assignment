import USER_ACTIONS from "./userActionsConstants";
const { ipcRenderer } = window.require('electron');

export function userLogin(payload) {
    return async dispatch => {
        dispatch(userLoginStart(payload));
        ipcRenderer.send('get user', {
            ...payload
        });
        ipcRenderer.on('return user', (event, data) => {
            console.log(data);
            if(data.error) {
                setTimeout(() => {
                    dispatch(userLoginError(data.error))
                }, 300);
            } else {
                setTimeout(() => {
                    dispatch(userLoginSuccess(data.user));
                }, 300);
            }
        });
    }
}

export function userLogout() {
    console.log('Test1');
    return async dispatch => {
        dispatch({
            type: USER_ACTIONS.LOGOUT
        });
        await setTimeout(() => {
            console.log('Test1');
            dispatch(userLogoutSuccess());
        }, 400);
    }
}

export function userLoginStart(payload) {
    return {
        type: USER_ACTIONS.LOGIN_START,
        payload
    }
}

export function userLoginSuccess(payload) {
    return {
        type: USER_ACTIONS.LOGIN_SUCCESS,
        payload
    }
}

export function userLoginError(error) {
    return {
        type: USER_ACTIONS.LOGIN_FAILED,
        error
    }
}

export function userLogoutSuccess() {
    return {
        type: USER_ACTIONS.LOGOUT_SUCCESS
    }
}