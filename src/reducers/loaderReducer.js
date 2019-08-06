import { ACTION_TYPES } from "../constants";

const INITIAL_STATE = false;

export default function(state = INITIAL_STATE, action) {
    const { type } = action;

    switch (type) {
        case ACTION_TYPES.SET_LOADER:
            return true;
        case ACTION_TYPES.CLEAR_LOADER:
            return INITIAL_STATE;
        default:
            return state;
    }
}
