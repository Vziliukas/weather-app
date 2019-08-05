import { combineReducers } from "redux";
import currentWeatherReducer from "../reducers/currentWeatherReducer";
import selectedWeatherReducer from "../reducers/selectedWeatherReducer";

const reducers = combineReducers({
    currentWeather: currentWeatherReducer,
    selectedWeather: selectedWeatherReducer,
});

export default reducers;
