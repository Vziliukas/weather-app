import { combineReducers } from "redux";
import currentWeatherReducer from "../reducers/currentWeatherReducer";
import selectedWeatherReducer from "../reducers/selectedWeatherReducer";
import loaderReducer from "../reducers/loaderReducer";

const reducers = combineReducers({
    currentWeather: currentWeatherReducer,
    selectedWeather: selectedWeatherReducer,
    loader: loaderReducer,
});

export default reducers;
