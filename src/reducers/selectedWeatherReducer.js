import { ACTION_TYPES } from "../constants";

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.SET_SELECTED_WEATHER:
            return payload;
        case ACTION_TYPES.CLEAR_SELECTED_WEATHER:
            return INITIAL_STATE;
        default:
            return state;
    }
}
