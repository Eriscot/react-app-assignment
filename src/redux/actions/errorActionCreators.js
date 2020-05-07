import ERROR from "./errorConstants";

export function errorOff() {
    return {
        type: ERROR.ERROR_OFF
    }
}