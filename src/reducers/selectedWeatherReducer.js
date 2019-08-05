import { ACTION_TYPES } from "../constants";

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.SET_SELECTED_WEATHER:
            return payload;
        default:
            return state;
    }
}
