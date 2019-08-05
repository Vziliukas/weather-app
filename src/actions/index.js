import axios from "axios";
import jsonpAdapter from "axios-jsonp";
import _get from "lodash/get";

import { ACTION_TYPES, API_URLS } from "../constants";

export const setWeather = (options) => (dispatch) => {
    console.log(options);
    const { lat, lng } = options;
    const url = `${API_URLS.DARK_SKY}${
        process.env.REACT_APP_API_KEY
    }/${lat},${lng}`;

    axios
        .get(url, { adapter: jsonpAdapter })
        .then((response) => {
            const payload = _get(response, "data", null);
            dispatch({
                type: ACTION_TYPES.SET_CURRENT_WEATHER,
                payload,
            });
        })
        .catch((err) => console.log(err));
};
