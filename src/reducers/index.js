import { combineReducers } from "redux";
import weatherReducer from "../reducers/weatherReducer";

const reducers = combineReducers({
    weather: weatherReducer,
});

export default reducers;
