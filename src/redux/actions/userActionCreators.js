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
                    dispatch(userLoginError(data.error));
                }, 300);
            } else {
                setTimeout(() => {
                    dispatch(userLoginSuccess(data.user));
                }, 300);
            }
        });
    }
}

export function getMagazines() {
    return async dispatch => {
        dispatch(getMagazinesStart());
        ipcRenderer.send('get magazines');
        ipcRenderer.on('return magazines', async (event, data) => {
            console.log(data);
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getMagazinesFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getMagazinesSuccess({
                        title: 'magazines',
                        values: data.table
                    }));
                }, 100)
            }
        });
    }
}

export function getMagazinesStart() {
    return {
        type: USER_ACTIONS.GET_MAGAZINES_START,
    }
}

export function getMagazinesFailed(payload) {
    return {
        type: USER_ACTIONS.GET_MAGAZINES_FAILED,
        payload
    }
}

export function getMagazinesSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_MAGAZINES_SUCCESS,
        payload
    }
}

export function userLogout() {
    return async dispatch => {
        dispatch({
            type: USER_ACTIONS.LOGOUT
        });
        await setTimeout(() => {
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